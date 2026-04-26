"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
  Menu,
  Snackbar,
} from "@mui/material";
import { Search, KeyboardArrowDown } from "@mui/icons-material";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Header } from "@/components/Admin/Header";
import { getUsers, updateStatus, disableUser } from "@/lib/api/users";
import { ROLE_MAP, SnackbarState, STATUS_MAP, User } from "@/lib/types/users";
import { usersStyles as styles } from "@/styles/Users/UsersStyles";
import { formatDateVN } from "@/lib/utils/users";
import { Pagination } from "@/components/Admin/Pagination";

const getStatusColor = (status: string) => {
  switch (status) {
    case "V":
      return "success.main";
    case "W":
      return "warning.main";
    case "P":
      return "grey.400";
    case "D":
      return "error.main";
    case "I":
      return "info.main";
    default:
      return "grey.200";
  }
};

const getRoleStyle = (role) => {
  switch (role) {
    case "T":
      return { bg: "warning.light" };
    case "S":
      return { bg: "info.light" };
    case "A":
      return { bg: "error.light" };
    default:
      return { bg: "grey.200" };
  }
};

const getStatusActions = (status) => {
  switch (status) {
    case "W":
      return [
        { value: "approve", label: "Approve" },
        { value: "reject", label: "Reject" },
      ];
    case "V":
      return [{ value: "disable", label: "Disabled" }];
    case "D":
      return [{ value: "enable", label: "Active" }];
    default:
      return [];
  }
};

const PAGE_SIZE = 10;

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const roleCode =
        roleFilter === "Learner"
          ? "S"
          : roleFilter === "Teacher"
            ? "T"
            : roleFilter === "Admin"
              ? "A"
              : undefined;

      let statusCode;
      if (statusFilter === "All") {
        statusCode = undefined;
      } else {
        statusCode =
          statusFilter === "Active"
            ? "V"
            : statusFilter === "Waiting Approval"
              ? "W"
              : statusFilter === "Pending Verification"
                ? "P"
                : statusFilter === "Incomplete Profile"
                  ? "I"
                  : statusFilter === "Disabled"
                    ? "D"
                    : undefined;
      }

      const response = (await getUsers({
        search: searchQuery || undefined,
        role: roleCode,
        status: statusCode,
        page: currentPage,
        page_size: PAGE_SIZE,
      })) as any;

      setUsers(response.results as User[]);
      setTotalCount(response.count);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to fetch users. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [searchQuery, roleFilter, statusFilter, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStatusAction = async (user, selectedAction) => {
    setActionLoadingId(user.id);

    try {
      if (selectedAction === "approve") {
        await updateStatus({
          id: user.id,
          actionFlag: "review_profile",
          approve: true,
        });
      } else if (selectedAction === "reject") {
        await updateStatus({
          id: user.id,
          actionFlag: "review_profile",
          approve: false,
        });
      } else if (selectedAction === "disable") {
        await disableUser(user.id);
      } else if (selectedAction === "enable") {
        await updateStatus({ id: user.id, actionFlag: "enable_account" });
      }

      await fetchUsers();
      setSnackbar({
        open: true,
        message: "User status updated successfully.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to update user status. Please try again.",
        severity: "error",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const hasAction = (user) => {
    if (["W", "V", "D"].includes(user.status) && user.role !== "A") {
      return true;
    }
    return false;
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + users.length, totalCount);

  return (
    <Box sx={styles.container}>
      <Sidebar />
      <Box sx={styles.mainContent}>
        <Header />
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.titleSection}>
            <Box sx={styles.headerRow}>
              <Box sx={styles.titleBox}>
                <Typography variant="h4" sx={styles.title}>
                  User Accounts
                </Typography>
                <Typography variant="body1" sx={styles.subtitle}>
                  Manage user accounts.
                </Typography>
              </Box>
              <Box sx={styles.filtersBox}>
                <TextField
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={styles.searchField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={styles.searchIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl sx={styles.filterControl}>
                  <Select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    displayEmpty
                    sx={styles.filterSelect}
                  >
                    <MenuItem value="All">All Roles</MenuItem>
                    <MenuItem value="Learner">Learner</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={styles.filterControlWide}>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    sx={styles.filterSelect}
                  >
                    <MenuItem value="All">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Waiting Approval">
                      Waiting Approval
                    </MenuItem>
                    <MenuItem value="Pending Verification">
                      Pending Verification
                    </MenuItem>
                    <MenuItem value="Incomplete Profile">
                      Incomplete Profile
                    </MenuItem>
                    <MenuItem value="Disabled">Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {loading && (
            <Box sx={styles.loadingBox}>
              <CircularProgress sx={styles.loadingSpinner} />
            </Box>
          )}

          {!loading && (
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow sx={styles.tableHeaderRow}>
                    <TableCell sx={styles.tableHeaderCell}>PROFILE</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>ROLE</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>JOINED</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) =>
                    (() => {
                      const roleStyle = getRoleStyle(user.role);
                      return (
                        <TableRow key={user.id} hover>
                          <TableCell>
                            <Box sx={styles.profileCell}>
                              <Avatar
                                src={user.avatar_url || undefined}
                                sx={styles.avatar}
                              >
                                {user.full_name?.[0]?.toUpperCase()}
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={styles.userName}
                                >
                                  {user.full_name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={styles.userEmail}
                                >
                                  {user.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={ROLE_MAP[user.role]}
                              size="small"
                              sx={{
                                bgcolor: roleStyle.bg,
                                color: "white",
                                ...styles.roleChip,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={styles.dateText}>
                              {formatDateVN(user.date_joined)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Chip
                                label={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    {STATUS_MAP[user.status]}
                                    {hasAction(user) && <KeyboardArrowDown />}
                                  </Box>
                                }
                                size="small"
                                onClick={
                                  hasAction(user)
                                    ? (e) => handleOpenMenu(e, user)
                                    : undefined
                                }
                                sx={{
                                  bgcolor: getStatusColor(user.status),
                                  color: "white",
                                  fontWeight: 500,
                                  cursor: hasAction(user)
                                    ? "pointer"
                                    : "default",
                                  "&:hover": {
                                    backgroundColor: getStatusColor(
                                      user.status,
                                    ),
                                    boxShadow: "none",
                                  },
                                }}
                              />
                              <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseMenu}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                              >
                                {selectedUser &&
                                  getStatusActions(selectedUser.status).map(
                                    (action) => (
                                      <MenuItem
                                        sx={{ typography: "body2" }}
                                        key={action.value}
                                        onClick={() => {
                                          handleStatusAction(
                                            selectedUser,
                                            action.value,
                                          );
                                          handleCloseMenu();
                                        }}
                                      >
                                        {action.label}
                                      </MenuItem>
                                    ),
                                  )}
                              </Menu>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })(),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalCount={totalCount}
              itemLabel="users"
              onPageChange={setCurrentPage}
            />
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

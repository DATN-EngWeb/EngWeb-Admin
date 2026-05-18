"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Header } from "@/components/Admin/Header";
import { Pagination } from "@/components/Admin/Pagination";
import { getUsers } from "@/lib/api/users";
import { pendingStyles as styles } from "@/styles/Pending/PendingStyles";
import { Teacher, SnackbarState } from "@/lib/types/users";
import { formatDateVN } from "@/lib/utils/users";

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 800;

export default function PendingPage() {
  const [users, setUsers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true);
      try {
        const response = (await getUsers({
          search: debouncedSearchQuery || undefined,
          page: currentPage,
          page_size: PAGE_SIZE,
          role: "T",
          status: "W",
        })) as any;

        setUsers(response.results);
        setTotalCount(response.count);
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load pending users. Please try again later.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, [debouncedSearchQuery, currentPage]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + users.length, totalCount);

  return (
    <Box sx={styles.container}>
      <Sidebar />
      <Box sx={styles.mainContent}>
        <Header />
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.headerSection}>
            <Box sx={styles.titleBox}>
              <Typography variant="h4" sx={styles.title}>
                Pending Approvals
              </Typography>
              <Typography variant="body1" sx={styles.subtitle}>
                Manage your pending account requests and approvals
              </Typography>
            </Box>
            <TextField
              placeholder="Search by name or email"
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
                    <TableCell sx={styles.tableHeaderCell}>
                      REQUEST DATE
                    </TableCell>
                    <TableCell sx={styles.tableHeaderCell}>
                      VIEW DETAILS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
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
                              <Typography variant="body2" sx={styles.userName}>
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
                          <Typography variant="body2" sx={styles.dateText}>
                            {formatDateVN(user.date_joined)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            sx={styles.actionIconButton}
                            onClick={() => router.push(`/pending/${user.id}`)}
                          >
                            <NavigateNextIcon sx={styles.actionIcon} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

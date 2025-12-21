'use client'

import { useState, useEffect } from 'react'
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
  Button,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material'
import { Search, KeyboardArrowDown } from '@mui/icons-material'
import { Sidebar } from '@/components/Admin/Sidebar'
import { Header } from '@/components/Admin/Header'
import { getUsers, ROLE_MAP, STATUS_MAP } from '@/lib/api'
import { usersStyles as styles } from '@/styles/Users/UsersStyles'

const mapApiUserToDisplayUser = (apiUser) => {
  const initials = apiUser.full_name
    ? apiUser.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return {
    id: apiUser.id,
    name: apiUser.full_name || apiUser.email,
    email: apiUser.email,
    role: ROLE_MAP[apiUser.role],
    joined: new Date(apiUser.date_joined).toISOString().split('T')[0],
    status: STATUS_MAP[apiUser.status],
    avatar: initials,
  };
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'success.light'
    case 'Waiting approval':
      return 'warning.light'
    case 'Pending Verification':
      return 'grey.300'
    case 'Banned':
      return 'error.light'
    default:
      return 'grey.100'
  }
}

const getStatusTextColor = (status) => {
  switch (status) {
    case 'Active':
      return 'success.dark'
    case 'Waiting approval':
      return 'warning.dark'
    case 'Pending Verification':
      return 'text.primary'
    case 'Banned':
      return 'error.dark'
    default:
      return 'text.secondary'
  }
}

const getRoleColor = (role) => {
  return role === 'Learner' ? 'info.light' : 'error.light'
}

export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('Pending')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const usersPerPage = 8

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const roleCode = roleFilter === 'Learner' ? 'S' : roleFilter === 'Teacher' ? 'T' : undefined;

        let statusCode;
        if (statusFilter === 'Pending') {
          statusCode = undefined;
        } else {
          statusCode =
            statusFilter === 'Active' ? 'V' :
              statusFilter === 'Waiting approval' ? 'W' :
                statusFilter === 'Pending Verification' ? 'P' :
                  statusFilter === 'Incomplete Profile' ? 'I' :
                    statusFilter === 'Banned' ? 'D' :
                      undefined;
        }

        const response = await getUsers({
          search: searchQuery || undefined,
          role: roleCode,
          status: statusCode,
          page: currentPage,
          page_size: usersPerPage,
        });

        let filteredResults = response.results;
        if (statusFilter === 'Pending') {
          filteredResults = response.results.filter(user =>
            user.status === 'P' || user.status === 'W' || user.status === 'I'
          );
        }

        const mappedUsers = filteredResults.map(mapApiUserToDisplayUser);
        setUsers(mappedUsers);
        setTotalCount(statusFilter === 'Pending' ? filteredResults.length : response.count);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load users. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery, roleFilter, statusFilter, currentPage]);

  const totalPages = Math.ceil(totalCount / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = Math.min(startIndex + users.length, totalCount)

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
                  User Pending Account
                </Typography>
                <Typography variant="body1" sx={styles.subtitle}>
                  Manage pending user accounts waiting for approval.
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
                    <MenuItem value="All">Role</MenuItem>
                    <MenuItem value="Learner">Learner</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={styles.filterControlWide}>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    sx={styles.filterSelect}
                  >
                    <MenuItem value="Pending">Pending Accounts</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Waiting approval">Waiting approval</MenuItem>
                    <MenuItem value="Pending Verification">Pending Verification</MenuItem>
                    <MenuItem value="Incomplete Profile">Incomplete Profile</MenuItem>
                    <MenuItem value="Banned">Banned</MenuItem>
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

          {error && !loading && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow sx={styles.tableHeaderRow}>
                    <TableCell sx={styles.tableHeaderCell}>
                      PROFILE
                    </TableCell>
                    <TableCell sx={styles.tableHeaderCell}>
                      ROLE
                    </TableCell>
                    <TableCell sx={styles.tableHeaderCell}>
                      JOINED
                    </TableCell>
                    <TableCell sx={styles.tableHeaderCell}>
                      STATUS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={styles.profileCell}>
                          <Avatar sx={styles.avatar}>
                            {user.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={styles.userName}>
                              {user.name}
                            </Typography>
                            <Typography variant="caption" sx={styles.userEmail}>
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            bgcolor: getRoleColor(user.role),
                            color: 'white',
                            ...styles.roleChip,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={styles.dateText}>
                          {user.joined}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          size="small"
                          deleteIcon={<KeyboardArrowDown sx={{ fontSize: '16px !important' }} />}
                          onDelete={() => { }}
                          sx={{
                            bgcolor: getStatusColor(user.status),
                            color: getStatusTextColor(user.status),
                            fontWeight: 500,
                            '& .MuiChip-deleteIcon': {
                              color: getStatusTextColor(user.status),
                              margin: 0,
                              marginLeft: '4px',
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!loading && !error && (
            <Box sx={styles.paginationContainer}>
              <Typography variant="body2" sx={styles.paginationText}>
                Showing {startIndex + 1}-{endIndex} of{' '}
                {totalCount} users.
              </Typography>
              <Box sx={styles.paginationButtons}>
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  sx={styles.prevNextButton}
                >
                  Prev
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    sx={styles.pageButton(currentPage === page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  sx={styles.prevNextButton}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

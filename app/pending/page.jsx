'use client'

import { useState, useEffect } from 'react'
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
} from '@mui/material'
import { Search } from '@mui/icons-material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Sidebar } from '@/components/Admin/Sidebar'
import { Header } from '@/components/Admin/Header'
import { getUsers } from '@/lib/api'
import { pendingStyles as styles } from '@/styles/Pending/PendingStyles'

const mapApiUserToPendingUser = (apiUser, index) => {
  const initials = apiUser.full_name
    ? apiUser.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return {
    id: apiUser.id,
    name: apiUser.full_name || apiUser.email,
    email: apiUser.email,
    requestDate: new Date(apiUser.date_joined).toISOString().split('T')[0],
    avatar: initials,
    requestNumber: `REQ-${String(index + 1).padStart(3, '0')}`,
    status: apiUser.status,
    role: apiUser.role,
  };
};

const getButtonColor = (index) => {
  const colors = [
    { bg: 'error.light', text: 'error.dark' },
    { bg: 'warning.light', text: 'warning.dark' },
    { bg: 'info.light', text: 'info.main' },
    { bg: 'success.light', text: 'success.main' },
  ]
  return colors[index % colors.length]
}

export default function PendingPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(8)

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await getUsers({
          search: searchQuery || undefined,
          page: page + 1,
          page_size: 100,
        });

        const pendingUsers = response.results.filter(user =>
          user.status === 'P' || user.status === 'W' || user.status === 'I'
        );

        const mappedUsers = pendingUsers.map((user, index) => mapApiUserToPendingUser(user, index));
        setUsers(mappedUsers);
      } catch (err) {
        console.error('Failed to fetch pending users:', err);
        setError('Failed to load pending users. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, [searchQuery, page]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage)

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
                      NO.
                    </TableCell>
                    <TableCell sx={styles.tableHeaderCell}>
                      REQUEST DATE
                    </TableCell>
                    <TableCell sx={styles.tableHeaderCell}>
                      ACTION
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user, index) => {
                    const buttonColor = getButtonColor(index)
                    return (
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
                          <Button size="small" sx={styles.viewReqButton(buttonColor.bg)}>
                            View req
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={styles.dateText}>
                            {user.requestDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton sx={styles.actionIconButton}>
                            <NavigateNextIcon sx={styles.actionIcon} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!loading && !error && (
            <Box sx={styles.paginationContainer}>
              <Typography variant="body2" sx={styles.paginationText}>
                Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredUsers.length)} of{' '}
                {filteredUsers.length} users.
              </Typography>
              <Box sx={styles.paginationButtons}>
                <Button
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={page === 0}
                  sx={styles.prevNextButton}
                >
                  Prev
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i).map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    sx={styles.pageButton(page === pageNum)}
                  >
                    {pageNum + 1}
                  </Button>
                ))}
                <Button
                  onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={page === totalPages - 1}
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


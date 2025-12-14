'use client'

import { useState } from 'react'
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
  TablePagination,
} from '@mui/material'
import { Search, ArrowForward } from '@mui/icons-material'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'

interface PendingUser {
  id: number
  name: string
  email: string
  requestDate: string
  avatar: string
  requestNumber: string
}

const samplePendingUsers: PendingUser[] = [
  {
    id: 1,
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    requestDate: '2023-10-12',
    avatar: 'SW',
    requestNumber: 'REQ-001',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@example.com',
    requestDate: '2023-10-12',
    avatar: 'JD',
    requestNumber: 'REQ-002',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    requestDate: '2023-10-12',
    avatar: 'EJ',
    requestNumber: 'REQ-003',
  },
  {
    id: 4,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    requestDate: '2023-10-12',
    avatar: 'MB',
    requestNumber: 'REQ-004',
  },
  {
    id: 5,
    name: 'Jessica Davis',
    email: 'jessica.d@example.com',
    requestDate: '2023-10-12',
    avatar: 'JD',
    requestNumber: 'REQ-005',
  },
  {
    id: 6,
    name: 'David Miller',
    email: 'david.m@example.com',
    requestDate: '2023-10-12',
    avatar: 'DM',
    requestNumber: 'REQ-006',
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    requestDate: '2023-10-12',
    avatar: 'LA',
    requestNumber: 'REQ-007',
  },
  {
    id: 8,
    name: 'Robert Taylor',
    email: 'robert.t@example.com',
    requestDate: '2023-10-12',
    avatar: 'RT',
    requestNumber: 'REQ-008',
  },
  {
    id: 9,
    name: 'Amanda White',
    email: 'amanda.w@example.com',
    requestDate: '2023-10-11',
    avatar: 'AW',
    requestNumber: 'REQ-009',
  },
  {
    id: 10,
    name: 'Christopher Lee',
    email: 'chris.l@example.com',
    requestDate: '2023-10-11',
    avatar: 'CL',
    requestNumber: 'REQ-010',
  },
  {
    id: 11,
    name: 'Michelle Garcia',
    email: 'michelle.g@example.com',
    requestDate: '2023-10-11',
    avatar: 'MG',
    requestNumber: 'REQ-011',
  },
  {
    id: 12,
    name: 'Daniel Martinez',
    email: 'daniel.m@example.com',
    requestDate: '2023-10-11',
    avatar: 'DM',
    requestNumber: 'REQ-012',
  },
  {
    id: 13,
    name: 'Jennifer Lopez',
    email: 'jennifer.l@example.com',
    requestDate: '2023-10-10',
    avatar: 'JL',
    requestNumber: 'REQ-013',
  },
  {
    id: 14,
    name: 'Kevin Harris',
    email: 'kevin.h@example.com',
    requestDate: '2023-10-10',
    avatar: 'KH',
    requestNumber: 'REQ-014',
  },
  {
    id: 15,
    name: 'Nicole Clark',
    email: 'nicole.c@example.com',
    requestDate: '2023-10-10',
    avatar: 'NC',
    requestNumber: 'REQ-015',
  },
  {
    id: 16,
    name: 'Ryan Lewis',
    email: 'ryan.l@example.com',
    requestDate: '2023-10-10',
    avatar: 'RL',
    requestNumber: 'REQ-016',
  },
  {
    id: 17,
    name: 'Stephanie Walker',
    email: 'stephanie.w@example.com',
    requestDate: '2023-10-09',
    avatar: 'SW',
    requestNumber: 'REQ-017',
  },
  {
    id: 18,
    name: 'Thomas Young',
    email: 'thomas.y@example.com',
    requestDate: '2023-10-09',
    avatar: 'TY',
    requestNumber: 'REQ-018',
  },
  {
    id: 19,
    name: 'Rachel King',
    email: 'rachel.k@example.com',
    requestDate: '2023-10-09',
    avatar: 'RK',
    requestNumber: 'REQ-019',
  },
  {
    id: 20,
    name: 'Brian Wright',
    email: 'brian.w@example.com',
    requestDate: '2023-10-09',
    avatar: 'BW',
    requestNumber: 'REQ-020',
  },
  {
    id: 21,
    name: 'Lauren Scott',
    email: 'lauren.s@example.com',
    requestDate: '2023-10-08',
    avatar: 'LS',
    requestNumber: 'REQ-021',
  },
  {
    id: 22,
    name: 'James Green',
    email: 'james.g@example.com',
    requestDate: '2023-10-08',
    avatar: 'JG',
    requestNumber: 'REQ-022',
  },
  {
    id: 23,
    name: 'Ashley Adams',
    email: 'ashley.a@example.com',
    requestDate: '2023-10-08',
    avatar: 'AA',
    requestNumber: 'REQ-023',
  },
  {
    id: 24,
    name: 'Matthew Baker',
    email: 'matthew.b@example.com',
    requestDate: '2023-10-08',
    avatar: 'MB',
    requestNumber: 'REQ-024',
  },
]

const getButtonColor = (index: number) => {
  const colors = [
    { bg: '#F3E5F5', text: '#9C27B0' }, // Purple
    { bg: '#FFF9E6', text: '#F5C842' }, // Yellow
    { bg: '#E3F2FD', text: '#2196F3' }, // Blue
    { bg: '#E8F5E9', text: '#4CAF50' }, // Green
  ]
  return colors[index % colors.length]
}

export default function PendingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const filteredUsers = samplePendingUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F5F5F0' }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: '280px',
          mt: '80px',
          p: 4,
        }}
      >
        <Header />
        <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
          {/* Title Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: '#8B4513',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Pending Approvals
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Manage your pending account requests and approvals
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <TextField
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: 350,
                bgcolor: '#FFFFFF',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Table */}
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#8B4513' }}>
                    PROFILE
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B4513' }}>
                    NO.
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B4513' }}>
                    REQUEST DATE
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B4513' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: '#F5C842',
                              color: '#8B4513',
                              width: 40,
                              height: 40,
                              fontSize: '0.875rem',
                              fontWeight: 600,
                            }}
                          >
                            {user.avatar}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: '#8B4513', fontWeight: 500 }}
                            >
                              {user.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#999' }}>
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          sx={{
                            bgcolor: buttonColor.bg,
                            color: buttonColor.text,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: 2,
                            px: 2,
                            '&:hover': {
                              bgcolor: buttonColor.bg,
                              opacity: 0.8,
                            },
                          }}
                        >
                          View req
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {user.requestDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{
                            color: '#8B4513',
                            '&:hover': {
                              bgcolor: '#FFF9E6',
                            },
                          }}
                        >
                          <ArrowForward />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[8]}
              labelRowsPerPage="Rows per page:"
              sx={{
                borderTop: '1px solid #E0E0E0',
                '& .MuiTablePagination-displayedRows': {
                  color: '#666',
                },
              }}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  )
}


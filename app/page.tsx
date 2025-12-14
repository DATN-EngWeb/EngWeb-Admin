'use client'

import { useState } from 'react'
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
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'

interface User {
  id: number
  name: string
  email: string
  role: 'Learner' | 'Teacher'
  joined: string
  status: 'Active' | 'Inactive' | 'Banned'
  avatar: string
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'SW',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Inactive',
    avatar: 'JD',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Banned',
    avatar: 'EJ',
  },
  {
    id: 4,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Teacher',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'MB',
  },
  {
    id: 5,
    name: 'Jessica Davis',
    email: 'jessica.d@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'JD',
  },
  {
    id: 6,
    name: 'David Miller',
    email: 'david.m@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Inactive',
    avatar: 'DM',
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Banned',
    avatar: 'LA',
  },
  {
    id: 8,
    name: 'Robert Taylor',
    email: 'robert.t@example.com',
    role: 'Teacher',
    joined: '2023-10-12',
    status: 'Banned',
    avatar: 'RT',
  },
  {
    id: 9,
    name: 'Amanda White',
    email: 'amanda.w@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'AW',
  },
  {
    id: 10,
    name: 'Christopher Lee',
    email: 'chris.l@example.com',
    role: 'Teacher',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'CL',
  },
  {
    id: 11,
    name: 'Michelle Garcia',
    email: 'michelle.g@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Inactive',
    avatar: 'MG',
  },
  {
    id: 12,
    name: 'Daniel Martinez',
    email: 'daniel.m@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Banned',
    avatar: 'DM',
  },
  {
    id: 13,
    name: 'Jennifer Lopez',
    email: 'jennifer.l@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'JL',
  },
  {
    id: 14,
    name: 'Kevin Harris',
    email: 'kevin.h@example.com',
    role: 'Teacher',
    joined: '2023-10-12',
    status: 'Inactive',
    avatar: 'KH',
  },
  {
    id: 15,
    name: 'Nicole Clark',
    email: 'nicole.c@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'NC',
  },
  {
    id: 16,
    name: 'Ryan Lewis',
    email: 'ryan.l@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Banned',
    avatar: 'RL',
  },
  {
    id: 17,
    name: 'Stephanie Walker',
    email: 'stephanie.w@example.com',
    role: 'Teacher',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'SW',
  },
  {
    id: 18,
    name: 'Thomas Young',
    email: 'thomas.y@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Inactive',
    avatar: 'TY',
  },
  {
    id: 19,
    name: 'Rachel King',
    email: 'rachel.k@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'RK',
  },
  {
    id: 20,
    name: 'Brian Wright',
    email: 'brian.w@example.com',
    role: 'Teacher',
    joined: '2023-10-12',
    status: 'Banned',
    avatar: 'BW',
  },
  {
    id: 21,
    name: 'Lauren Scott',
    email: 'lauren.s@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'LS',
  },
  {
    id: 22,
    name: 'James Green',
    email: 'james.g@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Inactive',
    avatar: 'JG',
  },
  {
    id: 23,
    name: 'Ashley Adams',
    email: 'ashley.a@example.com',
    role: 'Teacher',
    joined: '2023-10-12',
    status: 'Active',
    avatar: 'AA',
  },
  {
    id: 24,
    name: 'Matthew Baker',
    email: 'matthew.b@example.com',
    role: 'Learner',
    joined: '2023-10-12',
    status: 'Banned',
    avatar: 'MB',
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 8

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'All' || user.role === roleFilter
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#E8F5E9'
      case 'Inactive':
        return '#F5F5F5'
      case 'Banned':
        return '#FFEBEE'
      default:
        return '#F5F5F5'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#4CAF50'
      case 'Inactive':
        return '#757575'
      case 'Banned':
        return '#F44336'
      default:
        return '#757575'
    }
  }

  const getRoleColor = (role: string) => {
    return role === 'Learner' ? '#E3F2FD' : '#F3E5F5'
  }

  const getRoleTextColor = (role: string) => {
    return role === 'Learner' ? '#2196F3' : '#9C27B0'
  }

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
              User List
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Manage your users effectively.
            </Typography>
          </Box>

          {/* Search and Filters */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              flexWrap: 'wrap',
            }}
          >
            <TextField
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexGrow: 1,
                minWidth: 300,
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
            <FormControl
              sx={{
                minWidth: 150,
                bgcolor: '#FFFFFF',
                borderRadius: 2,
              }}
            >
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem value="All">Role</MenuItem>
                <MenuItem value="Learner">Learner</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                minWidth: 150,
                bgcolor: '#FFFFFF',
                borderRadius: 2,
              }}
            >
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem value="All">Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Banned">Banned</MenuItem>
              </Select>
            </FormControl>
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
                    ROLE
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B4513' }}>
                    JOINED
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B4513' }}>
                    STATUS
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B4513' }}>
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
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
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          bgcolor: getRoleColor(user.role),
                          color: getRoleTextColor(user.role),
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {user.joined}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(user.status),
                          color: getStatusTextColor(user.status),
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        sx={{
                          color: user.status === 'Active' ? '#F44336' : '#4CAF50',
                          textTransform: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            bgcolor: 'transparent',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {user.status === 'Active' ? 'Disable' : 'Enable'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Typography variant="body2" sx={{ color: '#666' }}>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of{' '}
              {filteredUsers.length} users.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                sx={{
                  color: '#8B4513',
                  textTransform: 'none',
                  '&:disabled': {
                    color: '#CCC',
                  },
                }}
              >
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  sx={{
                    minWidth: 40,
                    color: currentPage === page ? '#8B4513' : '#666',
                    bgcolor: currentPage === page ? '#F5C842' : 'transparent',
                    textTransform: 'none',
                    fontWeight: currentPage === page ? 600 : 400,
                    '&:hover': {
                      bgcolor: currentPage === page ? '#F5C842' : '#F5F5F5',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                sx={{
                  color: '#8B4513',
                  textTransform: 'none',
                  '&:disabled': {
                    color: '#CCC',
                  },
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


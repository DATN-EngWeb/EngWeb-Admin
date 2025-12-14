'use client'

import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'

export default function ProfilePage() {
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
        <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
          <Paper
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Yellow Banner */}
            <Box
              sx={{
                bgcolor: '#F5C842',
                height: 200,
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                p: 3,
              }}
            >
              <Button
                sx={{
                  bgcolor: '#FFF9E6',
                  color: '#8B4513',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    bgcolor: '#FFF9E6',
                    opacity: 0.9,
                  },
                }}
              >
                Coverage Server
              </Button>
            </Box>

            {/* Profile Avatar */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: -10,
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: '#4DD0E1',
                  border: '4px solid #FFFFFF',
                  fontSize: '3rem',
                }}
              >
                👤
              </Avatar>
              <Typography
                variant="h5"
                sx={{
                  color: '#8B4513',
                  fontWeight: 700,
                  mt: 2,
                }}
              >
                Sarah Wilson
              </Typography>
            </Box>

            {/* Profile Setting Section */}
            <Box sx={{ p: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#8B4513',
                    fontWeight: 700,
                  }}
                >
                  Profile Setting
                </Typography>
                <Button
                  startIcon={<Edit />}
                  sx={{
                    bgcolor: '#FFF9E6',
                    color: '#8B4513',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#FFF9E6',
                      opacity: 0.9,
                    },
                  }}
                >
                  Edit
                </Button>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#999',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        letterSpacing: 1,
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      FULL NAME
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#8B4513',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                      }}
                    >
                      Sarah Wilson
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#999',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        letterSpacing: 1,
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      ROLE
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#8B4513',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                      }}
                    >
                      Admin
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#999',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        letterSpacing: 1,
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      EMAIL
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#8B4513',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                      }}
                    >
                      sarah.w@example.com
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#999',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        letterSpacing: 1,
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      PHONE
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#8B4513',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                      }}
                    >
                      +94 901 234 567
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Security Section */}
            <Box
              sx={{
                p: 4,
                borderTop: '1px solid #E0E0E0',
                bgcolor: '#FAFAFA',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#8B4513',
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Security
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#8B4513',
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    Password
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#999',
                    }}
                  >
                    Last changed 2 months ago
                  </Typography>
                </Box>
                <Button
                  sx={{
                    bgcolor: '#FFF9E6',
                    color: '#8B4513',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#FFF9E6',
                      opacity: 0.9,
                    },
                  }}
                >
                  Change
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#8B4513',
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    Pin/Biometric
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#999',
                    }}
                  >
                    Last changed 2 months ago
                  </Typography>
                </Box>
                <Button
                  sx={{
                    bgcolor: '#FFF9E6',
                    color: '#8B4513',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: '#FFF9E6',
                      opacity: 0.9,
                    },
                  }}
                >
                  Change
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}


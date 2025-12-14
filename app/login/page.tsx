'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
} from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (email === 'admin@gmail.com' && password === 'admin12345') {
      login()
      router.push('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F5F5F0',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                bgcolor: '#F5C842',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
                N
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
              NENS
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              color: '#8B4513',
              fontWeight: 700,
              textAlign: 'center',
              mb: 1,
            }}
          >
            Admin Login
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Sign in to access the admin panel
          </Typography>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#F5C842',
                color: '#8B4513',
                fontWeight: 600,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: '#F5C842',
                  opacity: 0.9,
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}


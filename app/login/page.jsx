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
import { useAuth } from '@/lib/contexts/AuthContext'
import Image from 'next/image'
import { loginStyles } from '@/styles/Login/LoginStyles'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (email === 'admin@gmail.com' && password === 'admin12345') {
            login()
            router.push('/users')
        } else {
            setError('Invalid email or password')
        }
    }

    return (
        <Box sx={loginStyles.container}>
            <Container maxWidth="sm">
                <Paper elevation={0} sx={loginStyles.paper}>
                    <Box sx={loginStyles.logoBox}>
                        <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            width={200}
                            height={60}
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>

                    <Typography variant="h5" sx={loginStyles.title}>
                        Admin Login
                    </Typography>
                    <Typography variant="body2" sx={loginStyles.subtitle}>
                        Sign in to access the admin panel
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={loginStyles.alert}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={loginStyles.textField}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={loginStyles.textField}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={loginStyles.submitButton}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

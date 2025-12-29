'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Button, Grid, Paper, CircularProgress, Alert } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/Admin/Sidebar'
import { Header } from '@/components/Admin/Header'
import {
    People,
    PendingActions,
    AccountCircle,
    Dashboard as DashboardIcon
} from '@mui/icons-material'
import { dashboardStyles } from '@/styles/Dashboard/DashboardStyles'
import { getStats } from '@/lib/api'

export default function Home() {
    const router = useRouter()
    const [stats, setStats] = useState({
        totalUsers: 0,
        pendingApprovals: 0,
        activeUsers: 0,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await getStats()
                setStats(data)
            } catch (err) {
                console.error('Failed to fetch stats:', err)
                setError('Failed to load statistics. Please make sure the backend is running.')
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const menuItems = [
        {
            title: 'Users',
            description: 'Manage all users in the system',
            icon: People,
            path: '/users',
            color: 'info.main',
            bgColor: 'info.light',
        },
        {
            title: 'Pending Approvals',
            description: 'Review pending account requests',
            icon: PendingActions,
            path: '/pending',
            color: 'warning.main',
            bgColor: 'warning.light',
        },
        {
            title: 'Profile',
            description: 'View and edit your profile',
            icon: AccountCircle,
            path: '/profile',
            color: 'success.main',
            bgColor: 'success.light',
        },
    ]

    return (
        <Box sx={dashboardStyles.container}>
            <Sidebar />
            <Box sx={dashboardStyles.mainContent}>
                <Header />
                <Box sx={dashboardStyles.contentWrapper}>

                    <Box sx={dashboardStyles.titleSection}>
                        <Typography
                            variant="h3"
                            sx={dashboardStyles.title}
                        >
                            Welcome to Admin Dashboard
                        </Typography>
                        <Typography variant="h6" sx={dashboardStyles.subtitle}>
                            Manage your English learning platform efficiently
                        </Typography>
                    </Box>


                    <Grid container spacing={3}>
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Grid item xs={12} md={6} lg={4} key={item.path}>
                                    <Paper
                                        sx={dashboardStyles.menuCard}
                                        onClick={() => router.push(item.path)}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mb: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    ...dashboardStyles.iconBox,
                                                    bgcolor: item.bgColor,
                                                }}
                                            >
                                                <Icon sx={{ fontSize: 32, color: item.color }} />
                                            </Box>
                                            <Typography
                                                variant="h5"
                                                sx={dashboardStyles.menuTitle}
                                            >
                                                {item.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" sx={dashboardStyles.menuDescription}>
                                            {item.description}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>


                    <Box sx={dashboardStyles.statsSection}>
                        <Typography
                            variant="h5"
                            sx={dashboardStyles.statsTitle}
                        >
                            Quick Stats
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Paper
                                        sx={{
                                            ...dashboardStyles.statCard,
                                            bgcolor: '#E3F2FD',
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ ...dashboardStyles.statValue, color: '#2196F3' }}>
                                            {stats.totalUsers}
                                        </Typography>
                                        <Typography variant="body1" sx={dashboardStyles.statLabel}>
                                            Total Users
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper
                                        sx={{
                                            ...dashboardStyles.statCard,
                                            bgcolor: '#FFF3E0',
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ ...dashboardStyles.statValue, color: '#FF9800' }}>
                                            {stats.pendingApprovals}
                                        </Typography>
                                        <Typography variant="body1" sx={dashboardStyles.statLabel}>
                                            Pending Approvals
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper
                                        sx={{
                                            ...dashboardStyles.statCard,
                                            bgcolor: '#E8F5E9',
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ ...dashboardStyles.statValue, color: '#4CAF50' }}>
                                            {stats.activeUsers}
                                        </Typography>
                                        <Typography variant="body1" sx={dashboardStyles.statLabel}>
                                            Active Users
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

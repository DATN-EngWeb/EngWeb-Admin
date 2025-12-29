'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material'
import { Edit, Person } from '@mui/icons-material'
import { Sidebar } from '@/components/Admin/Sidebar'
import { Header } from '@/components/Admin/Header'
import { profileStyles as styles } from '@/styles/Profile/ProfileStyles'
import { getCurrentUser, updateUser, ROLE_MAP } from '@/lib/api'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    id: null,
    full_name: '',
    email: '',
    phone_number: '',
    role: '',
    bio: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    bio: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCurrentUser()
        setProfile(data)
        setFormData({
          full_name: data.full_name || '',
          phone_number: data.phone_number || '',
          bio: data.bio || '',
        })
      } catch (err) {
        console.error('Failed to fetch profile:', err)
        setError('Failed to load profile. Please make sure the backend is running.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const updatedData = await updateUser(profile.id, formData)
      setProfile(updatedData)
      setSuccessMessage('Profile updated successfully!')
    } catch (err) {
      console.error('Failed to update profile:', err)
      setError('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return '??'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (loading) {
    return (
      <Box sx={styles.container}>
        <Sidebar />
        <Box sx={styles.mainContent}>
          <Header />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Sidebar />
      <Box sx={styles.mainContent}>
        <Header />
        <Box sx={styles.contentWrapper}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Paper sx={styles.profileCard}>
            <Box sx={styles.banner}>
              <Button sx={styles.editButton}>
                Coverage Server
              </Button>
            </Box>

            <Box sx={styles.avatarBox}>
              <Avatar sx={styles.avatar}>
                {getInitials(profile.full_name)}
              </Avatar>
              <Typography variant="h5" sx={styles.userName}>
                {profile.full_name || 'No Name'}
              </Typography>
              <Typography variant="body2" sx={styles.userEmail}>
                {profile.email}
              </Typography>
            </Box>

            <Box sx={styles.sectionContainer}>
              <Box sx={styles.sectionHeader}>
                <Typography variant="h6" sx={styles.sectionTitle}>
                  Profile Setting
                </Typography>
                <Button
                  startIcon={<Edit />}
                  sx={styles.saveButton}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    value={profile.email}
                    disabled
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Role
                  </Typography>
                  <TextField
                    fullWidth
                    value={ROLE_MAP[profile.role] || profile.role}
                    disabled
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Bio
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    sx={styles.textField}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={styles.securitySection}>
              <Box sx={styles.sectionHeader}>
                <Typography variant="h6" sx={styles.sectionTitle}>
                  Security
                </Typography>
                <Button sx={styles.changePasswordButton}>
                  Change Password
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Current Password
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    placeholder="Enter current password"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    placeholder="Enter new password"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Confirm New Password
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    placeholder="Confirm new password"
                    sx={styles.textField}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

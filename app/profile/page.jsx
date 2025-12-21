'use client'

import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  TextField,
} from '@mui/material'
import { Edit, Person } from '@mui/icons-material'
import { Sidebar } from '@/components/Admin/Sidebar'
import { Header } from '@/components/Admin/Header'
import { profileStyles as styles } from '@/styles/Profile/ProfileStyles'

export default function ProfilePage() {
  return (
    <Box sx={styles.container}>
      <Sidebar />
      <Box sx={styles.mainContent}>
        <Header />
        <Box sx={styles.contentWrapper}>
          <Paper sx={styles.profileCard}>
            <Box sx={styles.banner}>
              <Button sx={styles.editButton}>
                Coverage Server
              </Button>
            </Box>

            <Box sx={styles.avatarBox}>
              <Avatar sx={styles.avatar}>
                <Person sx={styles.personIcon} />
              </Avatar>
              <Typography variant="h5" sx={styles.userName}>
                Sarah Wilson
              </Typography>
              <Typography variant="body2" sx={styles.userEmail}>
                sarah.wilson@example.com
              </Typography>
            </Box>

            <Box sx={styles.sectionContainer}>
              <Box sx={styles.sectionHeader}>
                <Typography variant="h6" sx={styles.sectionTitle}>
                  Profile Setting
                </Typography>
                <Button startIcon={<Edit />} sx={styles.saveButton}>
                  Save
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    defaultValue="Sarah Wilson"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    defaultValue="sarah.wilson@example.com"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    defaultValue="+1 234 567 8900"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={styles.fieldLabel}>
                    Role
                  </Typography>
                  <TextField
                    fullWidth
                    defaultValue="Admin"
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
                    defaultValue="Experienced administrator with a passion for education technology."
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
    </Box>
  )
}

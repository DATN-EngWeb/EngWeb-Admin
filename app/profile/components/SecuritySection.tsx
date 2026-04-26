"use client";

import { Box, Button, Grid, Typography } from "@mui/material";

export default function SecuritySection({
  styles,
  profile,
  onOpenChangePassword,
}) {
  return (
    <Box sx={styles.securitySection}>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Security
        </Typography>
        <Button
          variant="contained"
          sx={styles.changePasswordButton}
          onClick={onOpenChangePassword}
        >
          Change Password
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={styles.fieldLabel}>
            Username
          </Typography>
          <Typography variant="body2" sx={styles.readOnlyValue}>
            {profile.username}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={styles.fieldLabel}>
            Password
          </Typography>
          <Typography variant="body2" sx={styles.readOnlyValue}>
            ********
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

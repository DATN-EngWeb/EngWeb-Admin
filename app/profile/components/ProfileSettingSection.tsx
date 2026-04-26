"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function ProfileSettingSection({
  styles,
  profile,
  formData,
  isEditingProfile,
  saving,
  onEdit,
  onSave,
  onChange,
  formatDateForInput,
  readOnlyDateLabel,
}) {
  return (
    <Box sx={styles.sectionContainer}>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Profile Setting
        </Typography>
        {isEditingProfile ? (
          <Button sx={styles.saveButton} onClick={onSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        ) : (
          <Button sx={styles.saveButton} onClick={onEdit}>
            Edit
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={styles.fieldLabel}>
            Full Name
          </Typography>
          {isEditingProfile ? (
            <TextField
              fullWidth
              name="full_name"
              value={formData.full_name}
              onChange={onChange}
              sx={styles.textField}
            />
          ) : (
            <Typography variant="body2" sx={styles.readOnlyValue}>
              {profile.full_name || "-"}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={styles.fieldLabel}>
            Date of birth
          </Typography>
          {isEditingProfile ? (
            <TextField
              fullWidth
              name="date_of_birth"
              type="date"
              value={formatDateForInput(formData.date_of_birth)}
              onChange={onChange}
              sx={styles.textField}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().slice(0, 10) }}
            />
          ) : (
            <Typography variant="body2" sx={styles.readOnlyValue}>
              {readOnlyDateLabel}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={styles.fieldLabel}>
            Email
          </Typography>
          <Typography variant="body2" sx={styles.readOnlyValue}>
            {profile.email}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={styles.fieldLabel}>
            Role
          </Typography>
          <Typography variant="body2" sx={styles.readOnlyValue}>
            Admin
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePasswordDialog({
  styles,
  open,
  step,
  serverError,
  errors,
  otpCode,
  newPassword,
  confirmPassword,
  isLoading,
  showNewPassword,
  showConfirmPassword,
  onClose,
  onOtpChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onVerifyOtp,
  onResetPassword,
  onToggleNewPassword,
  onToggleConfirmPassword,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={styles.modalTitle}>Change Password</DialogTitle>
      <DialogContent sx={styles.modalContent}>
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        {step === 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              py: 3,
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={28} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Sending OTP to your email...
                </Typography>
              </>
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Preparing password change request...
              </Typography>
            )}
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              We've sent a 6-digit OTP to your email. Please enter it below.
            </Typography>
            <TextField
              fullWidth
              label="OTP Code"
              value={otpCode}
              onChange={onOtpChange}
              placeholder="Enter 6-digit OTP"
              inputProps={{ maxLength: 6 }}
              error={Boolean(errors.otpCode)}
              helperText={errors.otpCode}
              sx={styles.textField}
            />
          </Box>
        )}

        {step === 3 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={onNewPasswordChange}
              placeholder="Enter new password"
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onToggleNewPassword} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.textField}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              placeholder="Confirm new password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onToggleConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.textField}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={styles.modalActions}>
        <Button onClick={onClose}>Cancel</Button>
        {step === 2 && (
          <Button
            onClick={onVerifyOtp}
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        )}
        {step === 3 && (
          <Button
            onClick={onResetPassword}
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

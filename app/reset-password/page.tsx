"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { loginStyles } from "@/styles/Login/LoginStyles";
import { resetPassword } from "@/lib/api/auth";
import {
  PasswordErrors,
  PasswordForm,
  ShowPasswordState,
} from "@/lib/types/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    newPassword: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("resetToken");
    if (!token) {
      router.replace("/forgot-password");
      return;
    }
    setResetToken(token);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof PasswordErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setServerError("");
  };

  const togglePasswordVisibility = (field: keyof ShowPasswordState) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (): boolean => {
    const newErrors: PasswordErrors = {};

    if (!passwordForm.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordForm.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setServerError("");
    setSuccessMessage("");

    if (!validatePassword()) return;

    if (!resetToken) {
      setServerError(
        "Reset token is missing. Please request password reset again.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await resetPassword({
        resetToken,
        newPassword: passwordForm.newPassword.trim(),
      });

      setSuccessMessage("Password reset successfully!");

      localStorage.removeItem("resetToken");

      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        err?.data?.detail ||
        "Failed to reset password. Please try again.";

      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Typography variant="h5" sx={loginStyles.title}>
            Reset Password
          </Typography>
          <Typography variant="body2" sx={loginStyles.subtitle}>
            Enter your new password to complete account recovery.
          </Typography>

          {serverError && (
            <Alert severity="error" sx={loginStyles.alert}>
              {serverError}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={loginStyles.alert}>
              {successMessage} Redirecting to login page...
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={loginStyles.fieldGroup}>
              <Typography variant="body2" sx={loginStyles.fieldLabel}>
                New Password
              </Typography>
              <TextField
                fullWidth
                name="newPassword"
                type={showPassword.newPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword}
                sx={loginStyles.textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("newPassword")}
                        edge="end"
                        aria-label="toggle new password visibility"
                      >
                        {showPassword.newPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={loginStyles.fieldGroup}>
              <Typography variant="body2" sx={loginStyles.fieldLabel}>
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                name="confirmPassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                sx={loginStyles.textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                        edge="end"
                        aria-label="toggle confirm password visibility"
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={loginStyles.submitButton}
              disabled={isSubmitting || Boolean(successMessage)}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="button"
                variant="text"
                onClick={() => router.replace("/forgot-password")}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Back to Forgot Password
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

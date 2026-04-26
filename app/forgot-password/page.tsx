"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { forgotPassword } from "@/lib/api/auth";
import { loginStyles } from "@/styles/Login/LoginStyles";

type ForgotPasswordResponse = {
  username?: string;
  message?: string;
};

type FieldErrors = {
  usernameOrEmail?: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    const newErrors: FieldErrors = {};
    const normalized = usernameOrEmail.trim();

    if (!normalized) {
      newErrors.usernameOrEmail = "Please enter your username or email";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = (await forgotPassword(
        normalized,
      )) as ForgotPasswordResponse;

      if (response.username) {
        localStorage.setItem("forgotPasswordUsername", response.username);
      } else {
        localStorage.setItem("forgotPasswordUsername", normalized);
      }

      setSuccessMessage(
        response.message || "OTP code has been sent to your email.",
      );

      setTimeout(() => {
        router.push("/verify-otp");
      }, 1000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to send OTP. Please try again.";
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
            Forgot Password
          </Typography>
          <Typography variant="body2" sx={loginStyles.subtitle}>
            Enter your username or email to receive an OTP code.
          </Typography>

          {serverError && (
            <Alert severity="error" sx={loginStyles.alert}>
              {serverError}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={loginStyles.alert}>
              {successMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={loginStyles.fieldGroup}>
              <Typography variant="body2" sx={loginStyles.fieldLabel}>
                Username or Email
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your username or email"
                value={usernameOrEmail}
                onChange={(e) => {
                  setUsernameOrEmail(e.target.value);
                  if (errors.usernameOrEmail) {
                    setErrors({ ...errors, usernameOrEmail: "" });
                  }
                }}
                error={Boolean(errors.usernameOrEmail)}
                helperText={errors.usernameOrEmail}
                sx={loginStyles.textField}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={loginStyles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send OTP"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="button"
                variant="text"
                onClick={() => router.replace("/login")}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

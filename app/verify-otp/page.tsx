"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  resendForgotPasswordOtp,
  verifyForgotPasswordOtp,
} from "@/lib/api/auth";
import { loginStyles } from "@/styles/Login/LoginStyles";

type VerifyOtpResponse = {
  reset_token?: string;
};

type FieldErrors = {
  otpCode?: string;
  username?: string;
};

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("forgotPasswordUsername");
    setUsername(storedUsername || "");
  }, []);

  const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    const newErrors: FieldErrors = {};
    const trimmedOtp = otpCode.trim();

    if (!trimmedOtp) {
      newErrors.otpCode = "Please enter your OTP code";
    } else if (!/^\d{6}$/.test(trimmedOtp)) {
      newErrors.otpCode = "OTP code must be 6 digits";
    }

    if (!username) {
      newErrors.username =
        "Missing username. Please request password reset again.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setIsVerifying(true);
      const response = (await verifyForgotPasswordOtp({
        username,
        otpCode: trimmedOtp,
      })) as VerifyOtpResponse;

      if (!response.reset_token) {
        throw new Error("Invalid OTP verification response");
      }

      localStorage.setItem("resetToken", response.reset_token);
      localStorage.removeItem("forgotPasswordUsername");

      setSuccessMessage("OTP verified successfully!");
      setTimeout(() => {
        router.push("/reset-password");
      }, 600);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.";
      setServerError(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setServerError("");
    setSuccessMessage("");

    if (!username) {
      setErrors({
        username: "Missing username. Please request password reset again.",
      });
      return;
    }

    try {
      setIsResending(true);
      await resendForgotPasswordOtp({ username });
      setSuccessMessage("A new OTP has been sent to your email.");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to resend OTP. Please try again.";
      setServerError(message);
    } finally {
      setIsResending(false);
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
            Verify OTP
          </Typography>
          <Typography variant="body2" sx={loginStyles.subtitle}>
            Enter the 6-digit code sent to your email.
          </Typography>

          {errors.username && (
            <Alert severity="warning" sx={loginStyles.alert}>
              {errors.username}
            </Alert>
          )}
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

          <Box component="form" onSubmit={handleVerify}>
            <Box sx={loginStyles.fieldGroup}>
              <Typography variant="body2" sx={loginStyles.fieldLabel}>
                OTP Code
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter 6-digit OTP"
                value={otpCode}
                onChange={(e) => {
                  setOtpCode(e.target.value);
                  if (errors.otpCode) {
                    setErrors({ ...errors, otpCode: "" });
                  }
                }}
                error={Boolean(errors.otpCode)}
                helperText={errors.otpCode}
                inputProps={{ maxLength: 6 }}
                sx={loginStyles.textField}
              />
            </Box>

            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={loginStyles.submitButton}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                disabled={isResending}
                onClick={handleResend}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </Button>
            </Box>

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

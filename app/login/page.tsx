"use client";

import Image from "next/image";
import Link from "next/link";
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

import { login as loginApi } from "@/lib/api/auth";
import { setAccessToken, setRefreshToken } from "@/lib/api/client";
import { decodeJwt } from "@/lib/utils/jwt";
import { loginStyles } from "@/styles/Login/LoginStyles";

type LoginResponse = {
  access: string;
  refresh: string;
  username: string;
  avatar: string;
};

type DecodedAccessToken = {
  role?: string;
  user_id?: string;
};

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your username or email");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = (await loginApi({
        username: username.trim(),
        password,
      })) as LoginResponse;

      if (!data.access || !data.refresh) {
        throw new Error("Invalid login response");
      }

      const decoded = decodeJwt<DecodedAccessToken>(data.access);
      const role = decoded?.role;

      if (role !== "A") {
        throw new Error(
          "You do not have permission to access this admin panel",
        );
      }

      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem("isAuthenticated", "true");
      document.cookie =
        "isAuthenticated=true; path=/; max-age=604800; samesite=lax";
      localStorage.setItem("username", data.username);
      localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("userId", decoded?.user_id || "");

      const nextPath = new URLSearchParams(window.location.search).get("next");
      const redirectPath =
        nextPath && nextPath.startsWith("/") ? nextPath : "/";
      window.location.replace(redirectPath);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
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
            <Box sx={loginStyles.fieldGroup}>
              <Typography variant="body2" sx={loginStyles.fieldLabel}>
                Username or Email
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your username or email"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={loginStyles.textField}
              />
            </Box>

            <Box sx={loginStyles.fieldGroup}>
              <Typography variant="body2" sx={loginStyles.fieldLabel}>
                Password
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={loginStyles.textField}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Link href="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography
                  component="span"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={loginStyles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

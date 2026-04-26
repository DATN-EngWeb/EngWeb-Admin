/* eslint-env browser */
import type {
  ApiError,
  LoginInput,
  VerifyForgotPasswordOtpInput,
  ResendForgotPasswordOtpInput,
  ResetPasswordInput,
} from "@/lib/types/auth";
import { apiFetch } from "./client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is required but not set in .env");
}
const ACCOUNTS_BASE_URL = `${API_BASE_URL.replace(/\/$/, "")}/api/accounts`;

export async function login({ username, password }: LoginInput) {
  return apiFetch(`${ACCOUNTS_BASE_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    cache: "no-store",
    skipAuth: true,
  });
}

export async function refreshToken(refreshTokenValue: string) {
  return apiFetch(`${ACCOUNTS_BASE_URL}/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshTokenValue,
    }),
    cache: "no-store",
    skipAuth: true,
  });
}

export async function logout(
  refreshTokenValue: string,
  accessToken?: string | null,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    return await apiFetch(`${ACCOUNTS_BASE_URL}/logout`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        refresh: refreshTokenValue,
      }),
      cache: "no-store",
    });
  } catch (error: unknown) {
    const apiError = error as ApiError;
    if (
      apiError.message === "Invalid refresh token" ||
      apiError.status === 400
    ) {
      return {};
    }
    throw error;
  }
}

export async function forgotPassword(usernameOrEmail: string) {
  return apiFetch(`${ACCOUNTS_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username_or_email: usernameOrEmail,
    }),
    cache: "no-store",
    skipAuth: true,
  });
}

export async function verifyForgotPasswordOtp({
  username,
  otpCode,
}: VerifyForgotPasswordOtpInput) {
  return apiFetch(`${ACCOUNTS_BASE_URL}/verify-otp/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      otp_code: otpCode,
    }),
    cache: "no-store",
    skipAuth: true,
  });
}

export async function resendForgotPasswordOtp({
  username,
}: ResendForgotPasswordOtpInput) {
  return apiFetch(`${ACCOUNTS_BASE_URL}/resend-otp/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
    cache: "no-store",
    skipAuth: true,
  });
}

export async function resetPassword({
  resetToken,
  newPassword,
}: ResetPasswordInput) {
  return apiFetch(`${ACCOUNTS_BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reset_token: resetToken,
      new_password: newPassword,
    }),
    cache: "no-store",
    skipAuth: true,
  });
}

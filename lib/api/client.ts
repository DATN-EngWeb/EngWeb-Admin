/* eslint-env browser */

import type { ApiError, TokenRefreshResponse } from "@/lib/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ACCOUNTS_BASE_URL = `${(API_BASE_URL || "").replace(/\/$/, "")}/api/accounts`;

function getErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Something went wrong";
  }

  const record = data as Record<string, unknown>;
  const directMessage = record.message ?? record.detail ?? record.error;

  if (typeof directMessage === "string" && directMessage.trim()) {
    return directMessage;
  }

  const firstValue = Object.values(record)[0];
  if (Array.isArray(firstValue) && firstValue.length > 0) {
    const firstItem = firstValue[0];
    if (typeof firstItem === "string" && firstItem.trim()) {
      return firstItem;
    }
  }

  return "Something went wrong";
}

let accessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export function setAccessToken(token: string | null) {
  accessToken = token;
  localStorage.setItem("accessToken", token || "");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function setRefreshToken(token: string | null) {
  localStorage.setItem("refreshToken", token || "");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

async function handleResponse<T = unknown>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const data: unknown = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : null;

  if (response.ok) return (data ?? {}) as T;

  const error: ApiError = new Error(getErrorMessage(data));
  error.data = data;
  error.status = response.status;

  throw error;
}

async function refreshAccessToken() {
  if (!refreshPromise) {
    const refreshTokenValue = getRefreshToken();

    refreshPromise = fetch(`${ACCOUNTS_BASE_URL}/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshTokenValue }),
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) {
          const error: ApiError = new Error("Refresh token expired or invalid");
          error.status = res.status;
          throw error;
        }
        return (await res.json()) as TokenRefreshResponse;
      })
      .then((data) => {
        if (!data.access || !data.refresh) {
          throw new Error("Invalid refresh token response");
        }
        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        return data.access;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function apiFetch(url: string, options: ApiFetchOptions = {}) {
  const { skipAuth = false, ...requestOptions } = options;
  const headers = new Headers(options.headers || {});
  const token = accessToken || getAccessToken();
  const existingAuthorization = headers.get("Authorization");

  if (!skipAuth && !existingAuthorization && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(url, {
    ...requestOptions,
    headers,
  });

  if (!skipAuth && response.status === 401) {
    try {
      const newToken = await refreshAccessToken();

      headers.set("Authorization", `Bearer ${newToken}`);

      response = await fetch(url, {
        ...requestOptions,
        headers,
      });
    } catch (err) {
      accessToken = null;
      localStorage.removeItem("isAuthenticated");
      document.cookie = "isAuthenticated=; path=/; max-age=0; samesite=lax";
      window.location.href = "/login";
      throw err;
    }
  }

  return handleResponse(response);
}

/* eslint-env browser */
import { apiFetch } from "./client";
import { GetUsersParams, UpdateStatusParams } from "@/lib/types/users";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is required but not set in .env");
}
const ACCOUNTS_BASE_URL = `${API_BASE_URL.replace(/\/$/, "")}/api/accounts/admin-users`;

export async function getUserOverview() {
  return apiFetch(`${ACCOUNTS_BASE_URL}/overview`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}

export const getUsers = async (params: GetUsersParams = {}) => {
  const query = new URLSearchParams();

  if (params?.role) {
    query.set("role", params.role);
  }
  if (params?.status) {
    query.set("status", params.status);
  }
  if (params?.search) {
    query.set("search", params.search);
  }
  query.set("page", String(params?.page || 1));
  query.set("page_size", String(params?.page_size || 10));

  const url = `${ACCOUNTS_BASE_URL}?${query.toString()}`;

  return apiFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
};

export const updateStatus = async ({
  id,
  actionFlag,
  approve,
}: UpdateStatusParams) => {
  const payload = {
    action: actionFlag,
    ...(typeof approve === "boolean" ? { approve } : {}),
  };

  return apiFetch(`${ACCOUNTS_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
};

export const disableUser = async (userId: number | string) => {
  return apiFetch(`${ACCOUNTS_BASE_URL}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
};

export const getUserDetails = async (userId: string) => {
  return apiFetch(`${ACCOUNTS_BASE_URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
};

export const updateUser = async (userId, userData) => {
  const isMultipart =
    typeof FormData !== "undefined" && userData instanceof FormData;

  if (isMultipart && !userData.has("action")) {
    userData.append("action", "update_profile");
  }

  return await apiFetch(`${ACCOUNTS_BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: isMultipart
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body: isMultipart ? userData : JSON.stringify(userData),
    cache: "no-store",
  });
};

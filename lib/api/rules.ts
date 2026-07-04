/* eslint-env browser */
import { apiFetch } from "./client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is required but not set in .env");
}

const ROOT_URL = API_BASE_URL.replace(/\/$/, "");
const RULES_URL = `${ROOT_URL}/api/user-progress/admin`;
const QUOTA_URL = `${ROOT_URL}/api/assistant/admin/quota-config`;

const JSON_HEADERS = { "Content-Type": "application/json" };

function getJson(url: string) {
  return apiFetch(url, {
    method: "GET",
    headers: JSON_HEADERS,
    cache: "no-store",
  });
}

function patchJson(url: string, data: object) {
  return apiFetch(url, {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
    cache: "no-store",
  });
}

// ---- User Levels ----
export function getUserLevels() {
  return getJson(`${RULES_URL}/levels`);
}
export function updateUserLevel(id: number, data: object) {
  return patchJson(`${RULES_URL}/levels/${id}`, data);
}

// ---- Completed Bonus ----
export function getCompletedBonuses() {
  return getJson(`${RULES_URL}/completed-bonuses`);
}
export function updateCompletedBonus(id: number, data: object) {
  return patchJson(`${RULES_URL}/completed-bonuses/${id}`, data);
}

// ---- EXP Bonus Rules ----
export function getExpBonusRules() {
  return getJson(`${RULES_URL}/exp-bonus-rules`);
}
export function updateExpBonusRule(id: number, data: object) {
  return patchJson(`${RULES_URL}/exp-bonus-rules/${id}`, data);
}

// ---- Streak Reward Rules ----
export function getStreakRewards() {
  return getJson(`${RULES_URL}/streak-reward-rules`);
}
export function updateStreakReward(id: number, data: object) {
  return patchJson(`${RULES_URL}/streak-reward-rules/${id}`, data);
}

// ---- Quota (single config row) ----
export function getQuota() {
  return getJson(QUOTA_URL);
}
export function updateQuota(data: object) {
  return patchJson(QUOTA_URL, data);
}

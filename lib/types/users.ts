export type UserRoleCode = "S" | "T" | "A";
export type UserStatusCode = "P" | "I" | "W" | "V" | "D";

export type GetUsersParams = {
  role?: UserRoleCode;
  status?: UserStatusCode;
  search?: string;
  page?: number;
  page_size?: number;
};

export type AdminUserActionFlag =
  | "update_profile"
  | "disable_account"
  | "enable_account"
  | "review_profile";

export type UpdateStatusParams = {
  id: number | string;
  actionFlag: AdminUserActionFlag;
  approve?: boolean;
};

export type UserCredential = {
  id: number;
  url: string;
  name: string;
};

export type Teacher = {
  id: number;
  avatar_url?: string;
  full_name?: string;
  role?: keyof typeof ROLE_MAP;
  email?: string;
  teacher_type?: string;
  experience_year?: number | string;
  current_workplace?: string;
  introduction?: string;
  credentials?: UserCredential[];
  date_joined: string;
};

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error";
};

export type User = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  date_joined: string;
  status: string;
  avatar_url: string;
};

export const STATUS_MAP = {
  P: "Pending Verification",
  I: "Incomplete Profile",
  W: "Waiting Approval",
  V: "Active",
  D: "Disabled",
} as const;

export const ROLE_MAP = {
  S: "Learner",
  T: "Teacher",
  A: "Admin",
} as const;

export const EMPLOYMENT_TYPE_MAP = {
  C: "Center Teacher",
  S: "School Teacher",
  F: "Freelance Teacher",
} as const;

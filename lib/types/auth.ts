export type ApiError = Error & {
  data?: unknown;
  status?: number;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type VerifyForgotPasswordOtpInput = {
  username: string;
  otpCode: string;
};

export type ResendForgotPasswordOtpInput = {
  username: string;
};

export type ResetPasswordInput = {
  resetToken: string;
  newPassword: string;
};

export type TokenRefreshResponse = {
  access?: string;
  refresh?: string;
};

export type ProfileForm = {
  full_name?: string;
  date_of_birth?: string;
};

export type ProfileChanges = Partial<{
  full_name: string;
  date_of_birth: string;
}>;

export type AdminProfile = {
  id: number;
  username: string;
  full_name?: string;
  email: string;
  date_of_birth?: string;
  role: string;
  status: string;
  avatar_url?: string;
  cover?: string;
};

export type ChangePasswordErrors = {
  otpCode?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type ChangePasswordModalState = {
  open: boolean;
  step: number;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
  errors: ChangePasswordErrors;
  serverError: string;
  isLoading: boolean;
};

export type PasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

export type PasswordErrors = {
  newPassword?: string;
  confirmPassword?: string;
};

export type ShowPasswordState = {
  newPassword: boolean;
  confirmPassword: boolean;
};

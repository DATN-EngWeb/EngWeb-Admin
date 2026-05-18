import { ChangePasswordErrors } from "@/lib/types/auth";

export const validateOtp = (otp: string): ChangePasswordErrors => {
  if (!otp) return { otpCode: "Please enter your OTP code" };
  if (!/^\d{6}$/.test(otp)) return { otpCode: "OTP code must be 6 digits" };
  return {};
};

export const validatePassword = (
  newPassword: string,
  confirmPassword: string,
): ChangePasswordErrors => {
  const errors: ChangePasswordErrors = {};

  if (!newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  }

  if (!confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password";
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

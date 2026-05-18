"use client";

import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Alert, Snackbar, Paper } from "@mui/material";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Header } from "@/components/Admin/Header";
import { profileStyles as styles } from "@/styles/Profile/ProfileStyles";
import { getUserDetails, updateUser } from "@/lib/api/users";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
} from "@/lib/api/auth";
import ProfileBannerSection from "./components/ProfileBannerSection";
import ProfileSettingSection from "./components/ProfileSettingSection";
import SecuritySection from "./components/SecuritySection";
import ChangePasswordDialog from "./components/ChangePasswordDialog";
import CoverEditorDialog from "./components/CoverEditorDialog";
import { SnackbarState } from "@/lib/types/users";
import { AdminProfile, ProfileChanges, ProfileForm } from "@/lib/types/auth";
import { validateOtp, validatePassword } from "@/lib/utils/auth";

export default function ProfilePage() {
  const { refreshUser } = useAuth();
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const coverPreviewObjectUrlRef = useRef("");
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
  });

  const [changePasswordModal, setChangePasswordModal] = useState({
    open: false,
    step: 1,
    otpCode: "",
    newPassword: "",
    confirmPassword: "",
    errors: {},
    serverError: "",
    isLoading: false,
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [coverEditorOpen, setCoverEditorOpen] = useState(false);
  const [coverDraftFile, setCoverDraftFile] = useState(null);
  const [coverDraftPreview, setCoverDraftPreview] = useState("");
  const [savingCoverDraft, setSavingCoverDraft] = useState(false);

  const loadProfile = async ({ showLoading = false } = {}) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setSnackbar({
          open: true,
          message: "User ID not found. Please log in again.",
          severity: "error",
        });
        return;
      }

      const data = (await getUserDetails(userId)) as any;
      setProfile(data);
      setFormData({
        full_name: data.full_name,
        date_of_birth: data.date_of_birth,
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to load profile",
        severity: "error",
      });
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const formatDateForInput = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toISOString().slice(0, 10);
  };

  const getProfileChanges = (
    formData: ProfileForm,
    profile: ProfileForm,
  ): ProfileChanges => {
    const changes: ProfileChanges = {};

    const name = formData.full_name?.trim() || "";
    if (name !== (profile.full_name || "").trim()) {
      changes.full_name = name;
    }

    const dob = formatDateForInput(formData.date_of_birth);
    if (dob !== formatDateForInput(profile.date_of_birth)) {
      changes.date_of_birth = dob;
    }

    return changes;
  };

  const dateOfBirthLabel = profile?.date_of_birth
    ? new Date(profile.date_of_birth).toLocaleDateString()
    : "-";

  useEffect(() => {
    loadProfile({ showLoading: true });

    return () => {
      if (coverPreviewObjectUrlRef.current) {
        URL.revokeObjectURL(coverPreviewObjectUrlRef.current);
        coverPreviewObjectUrlRef.current = "";
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const changes = getProfileChanges(formData, profile);
    if (Object.keys(changes).length === 0) {
      setIsEditingProfile(false);
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = (await updateUser(profile.id, {
        action: "update_profile",
        ...changes,
      })) as any;
      const updatedUser = response.user as AdminProfile;
      setProfile(updatedUser);
      setFormData({
        full_name: updatedUser.full_name,
        date_of_birth: updatedUser.date_of_birth,
      });
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      setIsEditingProfile(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCoverClick = () => coverInputRef.current?.click();
  const handleToggleProfileEdit = () => setIsEditingProfile(true);
  const handleAvatarClick = () => avatarInputRef.current?.click();

  const clearCoverDraft = () => {
    if (coverPreviewObjectUrlRef.current) {
      URL.revokeObjectURL(coverPreviewObjectUrlRef.current);
      coverPreviewObjectUrlRef.current = "";
    }
    setCoverDraftFile(null);
    setCoverDraftPreview("");
  };

  const openCoverEditor = (file) => {
    if (!file) return;
    clearCoverDraft();
    const previewUrl = URL.createObjectURL(file);
    coverPreviewObjectUrlRef.current = previewUrl;
    setCoverDraftFile(file);
    setCoverDraftPreview(previewUrl);
    setCoverEditorOpen(true);
  };

  const uploadProfileImage = async (file, fieldName) => {
    if (!file || !profile.id) return;

    const formData = new FormData();
    formData.append(fieldName, file);

    if (fieldName === "cover") {
      setUploadingCover(true);
    } else {
      setUploadingAvatar(true);
    }

    setError(null);

    try {
      const updatedData = (await updateUser(profile.id, formData)) as any;
      const updatedUser = updatedData?.user as AdminProfile;
      setProfile(updatedUser);
      setFormData({
        full_name: updatedUser.full_name,
        date_of_birth: updatedUser.date_of_birth,
      });
      setSnackbar({
        open: true,
        message: `${fieldName === "cover" ? "Cover" : "Avatar"} updated successfully!`,
        severity: "success",
      });
      if (fieldName === "avatar") {
        localStorage.setItem("avatar", updatedUser.avatar_url || "");
        refreshUser();
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to update ${fieldName}. Please try again.`,
        severity: "error",
      });
      setError(`Failed to update ${fieldName}. Please try again.`);
    } finally {
      if (fieldName === "cover") {
        setUploadingCover(false);
      } else {
        setUploadingAvatar(false);
      }
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    openCoverEditor(file);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    await uploadProfileImage(file, "avatar");
  };

  const handleSaveCoverDraft = async () => {
    if (!coverDraftFile) return;

    setSavingCoverDraft(true);
    try {
      await uploadProfileImage(coverDraftFile, "cover");
      setCoverEditorOpen(false);
      clearCoverDraft();
    } finally {
      setSavingCoverDraft(false);
    }
  };

  const handleCancelCoverDraft = () => {
    setCoverEditorOpen(false);
    clearCoverDraft();
  };

  const handleOpenChangePasswordModal = async () => {
    setChangePasswordModal({
      open: true,
      step: 1,
      otpCode: "",
      newPassword: "",
      confirmPassword: "",
      errors: {},
      serverError: "",
      isLoading: true,
    });

    try {
      await forgotPassword(profile.email);
      setChangePasswordModal((prev) => ({
        ...prev,
        isLoading: false,
        step: 2,
        serverError: "",
      }));
    } catch (err) {
      setChangePasswordModal((prev) => ({
        ...prev,
        isLoading: false,
        serverError: err.message || "Failed to send OTP. Please try again.",
      }));
    }
  };

  const isEmpty = (obj: object) => Object.keys(obj).length === 0;

  const handleVerifyOTP = async () => {
    const otp = changePasswordModal.otpCode.trim();
    const errors = validateOtp(otp);

    if (!isEmpty(errors)) {
      setChangePasswordModal((prev) => ({ ...prev, errors }));
      return;
    }

    setChangePasswordModal((prev) => ({
      ...prev,
      isLoading: true,
      errors: {},
    }));

    try {
      const res = (await verifyForgotPasswordOtp({
        username: profile?.username,
        otpCode: otp,
      })) as any;

      if (res?.reset_token) {
        localStorage.setItem("resetToken", res.reset_token);

        setChangePasswordModal((prev) => ({
          ...prev,
          step: 3,
          isLoading: false,
          serverError: "",
        }));
      }
    } catch (err: any) {
      setChangePasswordModal((prev) => ({
        ...prev,
        isLoading: false,
        serverError: err?.message || "Invalid OTP. Please try again.",
      }));
    }
  };

  const handleResetPassword = async () => {
    const { newPassword, confirmPassword } = changePasswordModal;

    const errors = validatePassword(newPassword, confirmPassword);

    if (!isEmpty(errors)) {
      setChangePasswordModal((prev) => ({ ...prev, errors }));
      return;
    }

    setChangePasswordModal((prev) => ({
      ...prev,
      isLoading: true,
      errors: {},
    }));

    try {
      const resetToken = localStorage.getItem("resetToken");

      if (!resetToken) throw new Error("Missing reset token");

      await resetPassword({
        resetToken,
        newPassword: newPassword.trim(),
      });

      localStorage.removeItem("resetToken");

      setSnackbar({
        open: true,
        message: "Password changed successfully!",
        severity: "success",
      });

      // reset modal state
      setChangePasswordModal({
        open: false,
        step: 1,
        otpCode: "",
        newPassword: "",
        confirmPassword: "",
        errors: {},
        serverError: "",
        isLoading: false,
      });
    } catch (err: any) {
      setChangePasswordModal((prev) => ({
        ...prev,
        isLoading: false,
        serverError:
          err?.message || "Failed to reset password. Please try again.",
      }));
    }
  };
  const handleCloseModal = () => {
    setChangePasswordModal({
      open: false,
      step: 1,
      otpCode: "",
      newPassword: "",
      confirmPassword: "",
      errors: {},
      serverError: "",
      isLoading: false,
    });
  };

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setChangePasswordModal((prev) => ({
      ...prev,
      otpCode: value,
      errors: { ...prev.errors, otpCode: "" },
    }));
  };

  const handleNewPasswordChange = (e) => {
    setChangePasswordModal((prev) => ({
      ...prev,
      newPassword: e.target.value,
      errors: { ...prev.errors, newPassword: "" },
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setChangePasswordModal((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
      errors: { ...prev.errors, confirmPassword: "" },
    }));
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Box sx={styles.container}>
        <Sidebar />
        <Box sx={styles.mainContent}>
          <Header />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Sidebar />
      <Box sx={styles.mainContent}>
        <Header />
        <Box sx={styles.contentWrapper}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Paper sx={styles.profileCard}>
            <ProfileBannerSection
              profile={profile}
              styles={styles}
              coverInputRef={coverInputRef}
              avatarInputRef={avatarInputRef}
              uploadingCover={uploadingCover}
              uploadingAvatar={uploadingAvatar}
              onCoverClick={handleCoverClick}
              onAvatarClick={handleAvatarClick}
              onCoverChange={handleCoverChange}
              onAvatarChange={handleAvatarChange}
              getInitials={getInitials}
            />

            <ProfileSettingSection
              styles={styles}
              profile={profile}
              formData={formData}
              isEditingProfile={isEditingProfile}
              saving={saving}
              onEdit={handleToggleProfileEdit}
              onSave={handleSave}
              onChange={handleInputChange}
              formatDateForInput={formatDateForInput}
              readOnlyDateLabel={dateOfBirthLabel}
            />

            <SecuritySection
              styles={styles}
              profile={{
                ...profile,
                role: "Admin",
              }}
              onOpenChangePassword={handleOpenChangePasswordModal}
            />
          </Paper>
        </Box>
      </Box>

      <ChangePasswordDialog
        styles={styles}
        open={changePasswordModal.open}
        step={changePasswordModal.step}
        serverError={changePasswordModal.serverError}
        errors={changePasswordModal.errors}
        otpCode={changePasswordModal.otpCode}
        newPassword={changePasswordModal.newPassword}
        confirmPassword={changePasswordModal.confirmPassword}
        isLoading={changePasswordModal.isLoading}
        showNewPassword={showNewPassword}
        showConfirmPassword={showConfirmPassword}
        onClose={handleCloseModal}
        onOtpChange={handleOTPChange}
        onNewPasswordChange={handleNewPasswordChange}
        onConfirmPasswordChange={handleConfirmPasswordChange}
        onVerifyOtp={handleVerifyOTP}
        onResetPassword={handleResetPassword}
        onToggleNewPassword={() => setShowNewPassword(!showNewPassword)}
        onToggleConfirmPassword={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }
      />

      <CoverEditorDialog
        styles={styles}
        open={coverEditorOpen}
        previewSrc={coverDraftPreview || profile.cover || ""}
        onClose={handleCancelCoverDraft}
        onChooseAnother={handleCoverClick}
        onSave={handleSaveCoverDraft}
        isSaving={savingCoverDraft}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

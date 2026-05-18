"use client";

import { Box, Button, Avatar, IconButton } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

export default function ProfileBannerSection({
  profile,
  styles,
  coverInputRef,
  avatarInputRef,
  uploadingCover,
  uploadingAvatar,
  onCoverClick,
  onAvatarClick,
  onCoverChange,
  onAvatarChange,
  getInitials,
}) {
  return (
    <>
      <Box sx={styles.banner}>
        {profile.cover ? (
          <Box
            component="img"
            src={profile.cover}
            alt="Cover"
            sx={styles.coverImage}
          />
        ) : null}
        <Box sx={styles.coverOverlay} />
        <Button
          sx={styles.coverButton}
          onClick={onCoverClick}
          disabled={uploadingCover}
        >
          {uploadingCover ? "Updating..." : "Change cover"}
        </Button>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          style={styles.hiddenInput}
          onChange={onCoverChange}
        />
      </Box>

      <Box sx={styles.avatarBox}>
        <Box sx={styles.avatarWrap}>
          <Avatar src={profile.avatar_url || undefined} sx={styles.avatar}>
            {getInitials(profile.full_name)}
          </Avatar>
          <IconButton
            sx={styles.avatarEditButton}
            onClick={onAvatarClick}
            disabled={uploadingAvatar}
            aria-label="Change avatar"
          >
            {uploadingAvatar ? "..." : <CameraAlt sx={{ fontSize: 16 }} />}
          </IconButton>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            style={styles.hiddenInput}
            onChange={onAvatarChange}
          />
        </Box>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Box component="div" sx={styles.userName}>
            {profile.full_name}
          </Box>
          <Box component="div" sx={styles.userEmail}>
            {profile.email}
          </Box>
        </Box>
      </Box>
    </>
  );
}

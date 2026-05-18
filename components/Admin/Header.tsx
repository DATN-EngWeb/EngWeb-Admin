"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { useAuth } from "@/lib/contexts/AuthContext";
import { headerStyles } from "@/styles/Components/HeaderStyles";

export function Header() {
  const { user } = useAuth();
  const displayName = user?.username?.trim() || "Admin Manager";
  const avatarText = displayName.charAt(0).toUpperCase() || "A";

  return (
    <Box sx={headerStyles.container}>
      <Box sx={headerStyles.userSection}>
        <Typography variant="body1" sx={headerStyles.userName}>
          {displayName}
        </Typography>
        <Box sx={headerStyles.avatarButton}>
          <Avatar src={user?.avatar || undefined} sx={headerStyles.avatar}>
            {avatarText}
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}

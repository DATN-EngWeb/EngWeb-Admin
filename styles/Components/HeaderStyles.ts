export const headerStyles = {
  container: {
    height: 80,
    bgcolor: "#FFFFFF",
    borderBottom: "1px solid #E0E0E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: 4,
    position: "fixed",
    top: 0,
    right: 0,
    left: 280,
    zIndex: 1000,
  },

  userSection: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  userName: {
    color: "#8B4513",
    fontWeight: 500,
  },

  avatarButton: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    cursor: "pointer",
  },

  avatar: {
    width: 32,
    height: 32,
    bgcolor: "#E0E0E0",
    fontSize: "0.875rem",
    cursor: "default",
  },

  logoutIcon: {
    mr: 1,
    fontSize: 20,
  },
};

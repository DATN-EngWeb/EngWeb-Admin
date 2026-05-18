export const sidebarStyles = {
  container: {
    width: 280,
    height: "100vh",
    bgcolor: "background.paper",
    borderRight: "1px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
  },

  logoBox: {
    p: 3,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },

  menuHeader: {
    px: 3,
    mb: 2,
  },

  menuTitle: {
    color: "text.secondary",
    textTransform: "uppercase",
    fontWeight: 600,
    letterSpacing: 1,
  },

  menuList: {
    px: 2,
  },

  menuItem: {
    mb: 0.5,
  },

  menuButton: (isActive) => ({
    borderRadius: 2,
    bgcolor: isActive ? "warning.light" : "transparent",
    "&:hover": {
      bgcolor: isActive ? "warning.light" : "action.hover",
    },
  }),

  menuIcon: (isActive) => ({
    minWidth: 40,
    color: isActive ? "secondary.main" : "text.secondary",
  }),

  menuText: (isActive) => ({
    color: "primary.main",
    fontWeight: isActive ? 600 : 400,
  }),

  logoutSection: {
    mt: "auto",
    px: 2,
    py: 2,
    borderTop: "1px solid",
    borderColor: "divider",
  },

  logoutButton: {
    borderRadius: 2,
    "&:hover": {
      bgcolor: "action.hover",
    },
  },

  logoutIcon: {
    minWidth: 40,
    color: "error.main",
  },

  logoutText: {
    color: "error.main",
    fontWeight: 600,
  },
};

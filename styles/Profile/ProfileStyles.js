export const profileStyles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    bgcolor: "background.default",
  },

  mainContent: {
    flexGrow: 1,
    ml: "280px",
    mt: "80px",
    p: 4,
  },

  contentWrapper: {
    maxWidth: "1200px",
    mx: "auto",
  },

  profileCard: {
    bgcolor: "background.paper",
    borderRadius: 2,
    overflow: "hidden",
    position: "relative",
  },

  banner: {
    bgcolor: "secondary.main",
    height: 120,
    p: 2,
    position: "relative",
  },

  coverImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  coverOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.22) 100%)",
  },

  coverButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 2,
    bgcolor: "rgba(255,255,255,0.92)",
    color: "primary.main",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    px: 2,
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    "&:hover": {
      bgcolor: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.14)",
    },
  },

  editButton: {
    bgcolor: "warning.light",
    color: "primary.main",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 2,
    px: 3,
    "&:hover": {
      bgcolor: "warning.light",
      opacity: 0.9,
    },
  },

  avatarBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: -8,
    mb: 3,
    position: "relative",
  },

  avatarWrap: {
    position: "relative",
    width: 120,
    height: 120,
  },

  avatar: {
    width: 120,
    height: 120,
    bgcolor: "info.main",
    border: "4px solid background.paper",
  },

  avatarEditButton: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 32,
    height: 32,
    minWidth: 32,
    borderRadius: "50%",
    bgcolor: "warning.main",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    "&:hover": {
      bgcolor: "warning.dark",
      boxShadow: "0 4px 10px rgba(0,0,0,0.24)",
    },
  },

  hiddenInput: {
    display: "none",
  },

  personIcon: {
    fontSize: "4rem",
    color: "white",
  },

  userName: {
    color: "primary.main",
    fontWeight: 700,
    mt: 2,
  },

  userEmail: {
    color: "text.secondary",
  },

  sectionContainer: {
    p: 3,
    mx: 3,
    mt: 2,
    borderRadius: 3,
    bgcolor: "rgba(148, 163, 184, 0.1)",
    border: "1px solid",
    borderColor: "rgba(148, 163, 184, 0.28)",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },

  sectionTitle: {
    color: "primary.main",
    fontWeight: 600,
  },

  saveButton: {
    bgcolor: "warning.light",
    color: "primary.main",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 2,
    px: 4,
    "&:hover": {
      bgcolor: "warning.light",
      opacity: 0.9,
    },
  },

  fieldLabel: {
    color: "text.secondary",
    fontWeight: 700,
  },

  readOnlyValue: {
    minHeight: 56,
    display: "flex",
    alignItems: "center",
    px: 0.5,
    color: "text.primary",
  },

  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "background.default",
    },
    mt: 1,
  },

  securitySection: {
    p: 3,
    mx: 3,
    mt: 2,
    mb: 3,
    borderRadius: 3,
    bgcolor: "rgba(148, 163, 184, 0.1)",
    border: "1px solid",
    borderColor: "rgba(148, 163, 184, 0.28)",
  },

  changePasswordButton: {
    bgcolor: "warning.light",
    color: "primary.main",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 2,
    px: 3,
    "&:hover": {
      bgcolor: "warning.light",
      opacity: 0.9,
    },
  },

  modalTitle: {
    color: "primary.main",
    fontWeight: 600,
  },

  modalContent: {
    py: 3,
  },

  modalActions: {
    p: 2,
    gap: 1,
  },

  uploadLoadingText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
  },
};

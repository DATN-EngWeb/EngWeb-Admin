export const profileStyles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    bgcolor: 'background.default',
  },

  mainContent: {
    flexGrow: 1,
    ml: '280px',
    mt: '80px',
    p: 4,
  },

  contentWrapper: {
    maxWidth: '1200px',
    mx: 'auto',
  },

  profileCard: {
    bgcolor: 'background.paper',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },

  banner: {
    bgcolor: 'secondary.main',
    height: 120,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    p: 2,
  },

  editButton: {
    bgcolor: 'warning.light',
    color: 'primary.main',
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 2,
    px: 3,
    '&:hover': {
      bgcolor: 'warning.light',
      opacity: 0.9,
    },
  },

  avatarBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: -8,
    mb: 3,
  },

  avatar: {
    width: 120,
    height: 120,
    bgcolor: 'info.main',
    border: '4px solid background.paper',
  },

  personIcon: {
    fontSize: '4rem',
    color: 'white',
  },

  userName: {
    color: 'primary.main',
    fontWeight: 700,
    mt: 2,
  },

  userEmail: {
    color: 'text.secondary',
  },

  sectionContainer: {
    p: 4,
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  },

  sectionTitle: {
    color: 'primary.main',
    fontWeight: 600,
  },

  saveButton: {
    bgcolor: 'warning.light',
    color: 'primary.main',
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 2,
    px: 4,
    '&:hover': {
      bgcolor: 'warning.light',
      opacity: 0.9,
    },
  },

  fieldLabel: {
    color: 'text.secondary',
    mb: 1,
    fontWeight: 500,
  },

  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: 'background.default',
    },
  },

  securitySection: {
    p: 4,
    borderTop: '1px solid',
    borderColor: 'divider',
  },

  changePasswordButton: {
    bgcolor: 'warning.light',
    color: 'primary.main',
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 2,
    px: 3,
    '&:hover': {
      bgcolor: 'warning.light',
      opacity: 0.9,
    },
  },
}

export const loginStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'background.default',
  },

  paper: {
    p: 4,
    borderRadius: 2,
    bgcolor: '#FFFFFF',
    boxShadow: 'none',
  },

  logoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 4,
  },

  title: {
    color: 'primary.main',
    fontWeight: 700,
    textAlign: 'center',
    mb: 1,
  },

  subtitle: {
    color: 'text.secondary',
    textAlign: 'center',
    mb: 4,
  },

  alert: {
    mb: 3,
    boxShadow: 'none',
  },

  textField: {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
    },
  },

  submitButton: {
    bgcolor: 'warning.main',
    color: '#FFFFFF',
    fontWeight: 600,
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '1rem',
    boxShadow: 'none',
    '&:hover': {
      bgcolor: 'warning.dark',
      boxShadow: 'none',
    },
  },
}

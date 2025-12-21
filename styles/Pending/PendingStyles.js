export const pendingStyles = {
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
    maxWidth: '1400px',
    mx: 'auto',
  },

  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
  },

  titleBox: {},

  title: {
    color: 'primary.main',
    fontWeight: 700,
    mb: 1,
  },

  subtitle: {
    color: 'text.secondary',
  },

  searchField: {
    width: 350,
    bgcolor: 'background.paper',
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
    },
  },

  searchIcon: {
    color: 'text.secondary',
  },

  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    py: 8,
  },

  loadingSpinner: {
    color: 'primary.main',
  },

  tableContainer: {
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },

  tableHeaderRow: {
    bgcolor: 'grey.50',
  },

  tableHeaderCell: {
    fontWeight: 600,
    color: 'primary.main',
  },

  profileCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  avatar: {
    bgcolor: 'secondary.main',
    color: 'primary.main',
    width: 40,
    height: 40,
    fontSize: '0.875rem',
    fontWeight: 600,
  },

  userName: {
    color: 'primary.main',
    fontWeight: 500,
  },

  userEmail: {
    color: 'text.secondary',
  },

  viewReqButton: (bgcolor) => ({
    bgcolor,
    color: 'white',
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: 2,
    px: 2,
    '&:hover': {
      bgcolor,
      opacity: 0.8,
    },
  }),

  dateText: {
    color: 'text.secondary',
  },

  actionIconButton: {
    bgcolor: 'primary.main',
    color: 'white',
    width: 32,
    height: 32,
    '&:hover': {
      bgcolor: 'primary.dark',
    },
  },

  actionIcon: {
    fontSize: '1.2rem',
  },

  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 3,
  },

  paginationText: {
    color: 'text.secondary',
  },

  paginationButtons: {
    display: 'flex',
    gap: 1,
  },

  prevNextButton: {
    color: 'primary.main',
    textTransform: 'none',
    '&:disabled': {
      color: 'grey.400',
    },
  },

  pageButton: (isActive) => ({
    minWidth: 40,
    color: isActive ? 'primary.main' : 'text.secondary',
    bgcolor: isActive ? 'secondary.main' : 'transparent',
    textTransform: 'none',
    fontWeight: isActive ? 600 : 400,
    '&:hover': {
      bgcolor: isActive ? 'secondary.main' : 'grey.100',
    },
  }),
}

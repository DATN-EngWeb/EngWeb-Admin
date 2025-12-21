export const usersStyles = {
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

  titleSection: {
    mb: 4,
  },

  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    gap: 2,
    flexWrap: 'wrap',
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

  filtersBox: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  },

  searchField: {
    flexGrow: 1,
    minWidth: 300,
    bgcolor: 'background.paper',
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
    },
  },

  searchIcon: {
    color: 'text.secondary',
  },

  filterControl: {
    minWidth: 150,
    bgcolor: 'background.paper',
    borderRadius: 2,
  },

  filterControlWide: {
    minWidth: 180,
    bgcolor: 'background.paper',
    borderRadius: 2,
  },

  filterSelect: {
    borderRadius: 2,
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
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

  roleChip: {
    fontWeight: 500,
  },

  dateText: {
    color: 'text.secondary',
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

export const dashboardStyles = {
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
    mb: 6,
  },

  title: {
    color: 'primary.main',
    fontWeight: 700,
    mb: 2,
  },

  subtitle: {
    color: 'text.secondary',
  },

  menuCard: {
    p: 4,
    borderRadius: 2,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: 2,
  },

  menuTitle: {
    color: 'primary.main',
    fontWeight: 600,
  },

  menuDescription: {
    color: 'text.secondary',
  },

  statsSection: {
    mt: 6,
  },

  statsTitle: {
    color: 'primary.main',
    fontWeight: 700,
    mb: 3,
  },

  statCard: {
    p: 3,
    borderRadius: 2,
  },

  statValue: {
    fontWeight: 700,
    mb: 1,
  },

  statLabel: {
    color: '#666',
  },
}

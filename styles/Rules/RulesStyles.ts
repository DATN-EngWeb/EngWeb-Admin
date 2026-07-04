export const rulesStyles = {
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
    maxWidth: "1400px",
    mx: "auto",
  },

  titleSection: {
    mb: 3,
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: 3,
    gap: 2,
    flexWrap: "wrap",
  },

  title: {
    color: "primary.main",
    fontWeight: 700,
    mb: 1,
  },

  subtitle: {
    color: "text.secondary",
  },

  addButton: {
    bgcolor: "secondary.main",
    color: "secondary.contrastText",
    px: 3,
    "&:hover": {
      bgcolor: "secondary.dark",
    },
  },

  tabsContainer: {
    borderBottom: "1px solid",
    borderColor: "divider",
    mb: 3,
  },

  tabs: {
    "& .MuiTab-root": {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "1rem",
      color: "text.secondary",
    },
    "& .Mui-selected": {
      color: "primary.main",
      fontWeight: 600,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "secondary.main",
      height: 3,
    },
  },

  loadingBox: {
    display: "flex",
    justifyContent: "center",
    py: 8,
  },

  loadingSpinner: {
    color: "primary.main",
  },

  tableContainer: {
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  tableHeaderRow: {
    bgcolor: "grey.50",
  },

  tableHeaderCell: {
    fontWeight: 600,
    color: "primary.main",
    whiteSpace: "nowrap",
  },

  actionsHeaderCell: {
    fontWeight: 600,
    color: "primary.main",
    textAlign: "right",
    whiteSpace: "nowrap",
  },

  cellText: {
    color: "text.primary",
  },

  mutedCellText: {
    color: "text.secondary",
  },

  clampText: {
    color: "text.secondary",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    maxWidth: 280,
  },

  actionsCell: {
    textAlign: "right",
    whiteSpace: "nowrap",
  },

  editIconButton: {
    color: "primary.main",
    "&:hover": {
      bgcolor: "action.hover",
    },
  },

  levelIcon: {
    width: 32,
    height: 32,
    borderRadius: 1,
    objectFit: "contain",
  },

  emptyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    py: 8,
    gap: 1,
  },

  emptyText: {
    color: "text.secondary",
  },

  chip: {
    fontWeight: 500,
    color: "white",
  },

  levelChip: {
    fontWeight: 500,
    bgcolor: "#FFFFFF",
    color: "#475569",
    border: "1px solid #CBD5E1",
  },

  dialogTitle: {
    color: "primary.main",
    fontWeight: 600,
  },

  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },

  fieldRow: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
  },

  fieldLabel: {
    display: "block",
    mb: 0.5,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "text.primary",
  },

  iconPreview: {
    mt: 1,
    width: 64,
    height: 64,
    objectFit: "contain",
    borderRadius: 1,
    border: "1px solid",
    borderColor: "divider",
  },

  fieldReadonlyValue: {
    py: 0.75,
    fontSize: "0.95rem",
    color: "text.primary",
  },

  fieldError: {
    mt: 0.5,
    fontSize: "0.75rem",
    color: "error.main",
  },

  dialogActions: {
    px: 3,
    pb: 2,
  },

  quotaCard: {
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    p: 4,
    maxWidth: 560,
  },

  quotaFields: {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
  },

  quotaActions: {
    display: "flex",
    justifyContent: "flex-end",
    mt: 3,
  },

  quotaNote: {
    color: "text.secondary",
    fontStyle: "italic",
  },
};

"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function CoverEditorDialog({
  styles,
  open,
  previewSrc,
  onClose,
  onChooseAnother,
  onSave,
  isSaving,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={styles.modalTitle}>Change Cover</DialogTitle>
      <DialogContent sx={styles.modalContent}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Preview the new cover image first. Save to apply it or Cancel to
          discard.
        </Typography>
        <Box
          component="img"
          src={previewSrc}
          alt="Cover preview"
          sx={{
            width: "100%",
            maxHeight: 320,
            objectFit: "cover",
            borderRadius: 2,
            bgcolor: "background.default",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={onChooseAnother} variant="outlined">
            Choose another image
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={styles.modalActions}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

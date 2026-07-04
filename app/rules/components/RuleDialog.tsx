"use client";

import { ReactNode } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";

type RuleDialogProps = {
  title: string;
  saving: boolean;
  serverError: string;
  onClose: () => void;
  onSave: () => void;
  disableSave?: boolean;
  children: ReactNode;
};

// A shared edit dialog. Each tab passes its title, its form fields (children),
// and the save/close handlers. The dialog draws the title, the error message,
// and the Cancel / Save buttons.
export function RuleDialog({
  title,
  saving,
  serverError,
  onClose,
  onSave,
  disableSave,
  children,
}: RuleDialogProps) {
  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={styles.dialogTitle}>{title}</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        {serverError ? <Alert severity="error">{serverError}</Alert> : null}
        {children}
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={saving || disableSave}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

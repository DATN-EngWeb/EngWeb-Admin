"use client";

import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <Box>
      <Typography sx={styles.fieldLabel}>{label}</Typography>
      {children}
      {error ? <Typography sx={styles.fieldError}>{error}</Typography> : null}
    </Box>
  );
}

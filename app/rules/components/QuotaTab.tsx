"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getQuota, updateQuota } from "@/lib/api/rules";
import { NotifyFn, Quota } from "@/lib/types/rules";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";
import { FormField } from "./FormField";

export function QuotaTab({ notify }: { notify: NotifyFn }) {
  const [limit, setLimit] = useState("");
  const [periodSeconds, setPeriodSeconds] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadQuota() {
    setLoading(true);
    setLoadFailed(false);
    try {
      const data = (await getQuota()) as Quota;
      setLimit(String(data.default_limit));
      setPeriodSeconds(String(data.default_period_seconds));
    } catch {
      setLoadFailed(true);
      notify("Failed to load quota settings.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuota();
  }, []);

  function validate() {
    const newErrors: { [key: string]: string } = {};

    const limitValue = Number(limit);
    const periodValue = Number(periodSeconds);

    if (limit.trim() === "") {
      newErrors.limit = "Limit is required.";
    } else if (Number.isNaN(limitValue) || limitValue < 1) {
      newErrors.limit = "Limit must be at least 1.";
    }

    if (periodSeconds.trim() === "") {
      newErrors.periodSeconds = "Quota Period is required.";
    } else if (Number.isNaN(periodValue) || periodValue < 60) {
      newErrors.periodSeconds = "Quota Period must be at least 60 seconds.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) {
      return;
    }

    setSaving(true);
    try {
      await updateQuota({
        default_limit: Number(limit),
        default_period_seconds: Number(periodSeconds),
        // Always update every existing user's quota too.
        apply_to_existing: true,
      });
      notify("Quota settings updated successfully.", "success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      notify(message, "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress sx={styles.loadingSpinner} />
      </Box>
    );
  }

  if (loadFailed) {
    return (
      <Box sx={styles.emptyBox}>
        <Typography variant="body1" sx={styles.emptyText}>
          Could not load quota settings.
        </Typography>
        <Button variant="contained" sx={styles.addButton} onClick={loadQuota}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Paper sx={styles.quotaCard}>
      <Box sx={styles.quotaFields}>
        <FormField label="Limit *" error={errors.limit}>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={limit}
            disabled={saving}
            onChange={(e) => setLimit(e.target.value)}
          />
        </FormField>

        <FormField
          label="Quota Period (seconds) *"
          error={errors.periodSeconds}
        >
          <TextField
            fullWidth
            size="small"
            type="number"
            value={periodSeconds}
            disabled={saving}
            onChange={(e) => setPeriodSeconds(e.target.value)}
          />
        </FormField>

        <Typography variant="body2" sx={styles.quotaNote}>
          Saving applies these values to all existing users&apos; quotas.
        </Typography>
      </Box>
      <Box sx={styles.quotaActions}>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Paper>
  );
}

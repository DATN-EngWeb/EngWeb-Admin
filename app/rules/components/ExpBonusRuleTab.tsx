"use client";

import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { getExpBonusRules, updateExpBonusRule } from "@/lib/api/rules";
import { EXPBonusRule, NotifyFn } from "@/lib/types/rules";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";
import { Column, RuleTable } from "./RuleTable";
import { RuleDialog } from "./RuleDialog";
import { FormField } from "./FormField";

const columns: Column<EXPBonusRule>[] = [
  {
    header: "Percentage Range",
    width: 1.5,
    render: (rule) => (
      <Typography variant="body2" sx={styles.cellText}>
        {rule.min_percentage}% – {rule.max_percentage}%
      </Typography>
    ),
  },
  {
    header: "EXP Awarded",
    width: 1.5,
    render: (rule) => (
      <Typography variant="body2" sx={styles.mutedCellText}>
        {rule.exp_percentage}%
      </Typography>
    ),
  },
  {
    header: "Rating",
    width: 2,
    render: (rule) => (
      <Typography variant="body2" sx={styles.mutedCellText}>
        {rule.rating}
      </Typography>
    ),
  },
  {
    header: "Feedback",
    width: 3,
    render: (rule) => (
      <Tooltip title={rule.feedback_message}>
        <Typography variant="body2" sx={styles.clampText}>
          {rule.feedback_message}
        </Typography>
      </Tooltip>
    ),
  },
];

export function ExpBonusRuleTab({ notify }: { notify: NotifyFn }) {
  const [rules, setRules] = useState<EXPBonusRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [ruleBeingEdited, setRuleBeingEdited] = useState<EXPBonusRule | null>(
    null,
  );

  async function loadRules() {
    setLoading(true);
    try {
      const data = (await getExpBonusRules()) as EXPBonusRule[];
      setRules(data);
    } catch {
      notify("Failed to load EXP bonus rules.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRules();
  }, []);

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress sx={styles.loadingSpinner} />
      </Box>
    );
  }

  return (
    <>
      <RuleTable
        columns={columns}
        rows={rules}
        onEdit={(rule) => setRuleBeingEdited(rule)}
      />

      {ruleBeingEdited ? (
        <EditExpBonusRuleDialog
          rule={ruleBeingEdited}
          onClose={() => setRuleBeingEdited(null)}
          onSaved={() => {
            setRuleBeingEdited(null);
            notify("EXP bonus rule updated successfully.", "success");
            loadRules();
          }}
        />
      ) : null}
    </>
  );
}

type EditExpBonusRuleDialogProps = {
  rule: EXPBonusRule;
  onClose: () => void;
  onSaved: () => void;
};

function EditExpBonusRuleDialog({
  rule,
  onClose,
  onSaved,
}: EditExpBonusRuleDialogProps) {
  const [minPercentage, setMinPercentage] = useState(
    String(rule.min_percentage),
  );
  const [maxPercentage, setMaxPercentage] = useState(
    String(rule.max_percentage),
  );
  const [expPercentage, setExpPercentage] = useState(
    String(rule.exp_percentage),
  );
  const [rating, setRating] = useState(rule.rating);
  const [feedback, setFeedback] = useState(rule.feedback_message);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  function validate() {
    const newErrors: { [key: string]: string } = {};

    const min = Number(minPercentage);
    const max = Number(maxPercentage);
    const exp = Number(expPercentage);

    if (minPercentage.trim() === "") {
      newErrors.minPercentage = "Min Percentage is required.";
    } else if (Number.isNaN(min) || min < 0 || min > 100) {
      newErrors.minPercentage = "Min Percentage must be between 0 and 100.";
    }

    if (maxPercentage.trim() === "") {
      newErrors.maxPercentage = "Max Percentage is required.";
    } else if (Number.isNaN(max) || max < 0 || max > 100) {
      newErrors.maxPercentage = "Max Percentage must be between 0 and 100.";
    }

    if (!newErrors.minPercentage && !newErrors.maxPercentage && min >= max) {
      newErrors.maxPercentage =
        "Max Percentage must be greater than Min Percentage.";
    }

    if (expPercentage.trim() === "") {
      newErrors.expPercentage = "EXP Percentage is required.";
    } else if (Number.isNaN(exp) || exp < 0) {
      newErrors.expPercentage = "EXP Percentage must be 0 or more.";
    }

    if (rating.trim() === "") {
      newErrors.rating = "Rating is required.";
    }

    if (feedback.trim() === "") {
      newErrors.feedback = "Feedback Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    setServerError("");
    if (!validate()) {
      return;
    }

    setSaving(true);
    try {
      await updateExpBonusRule(rule.id, {
        min_percentage: Number(minPercentage),
        max_percentage: Number(maxPercentage),
        exp_percentage: Number(expPercentage),
        rating: rating.trim(),
        feedback_message: feedback.trim(),
      });
      onSaved();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setServerError(message);
      setSaving(false);
    }
  }

  return (
    <RuleDialog
      title="Edit EXP Bonus Rule"
      saving={saving}
      serverError={serverError}
      onClose={onClose}
      onSave={handleSave}
    >
      <Box sx={styles.fieldRow}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <FormField label="Min Percentage *" error={errors.minPercentage}>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={minPercentage}
              disabled={saving}
              onChange={(e) => setMinPercentage(e.target.value)}
            />
          </FormField>
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <FormField label="Max Percentage *" error={errors.maxPercentage}>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={maxPercentage}
              disabled={saving}
              onChange={(e) => setMaxPercentage(e.target.value)}
            />
          </FormField>
        </Box>
      </Box>

      <FormField label="EXP Percentage Awarded *" error={errors.expPercentage}>
        <TextField
          fullWidth
          size="small"
          type="number"
          value={expPercentage}
          disabled={saving}
          onChange={(e) => setExpPercentage(e.target.value)}
        />
      </FormField>

      <FormField label="Rating *" error={errors.rating}>
        <TextField
          fullWidth
          size="small"
          value={rating}
          disabled={saving}
          onChange={(e) => setRating(e.target.value)}
        />
      </FormField>

      <FormField label="Feedback Message *" error={errors.feedback}>
        <TextField
          fullWidth
          size="small"
          multiline
          minRows={3}
          value={feedback}
          disabled={saving}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </FormField>
    </RuleDialog>
  );
}

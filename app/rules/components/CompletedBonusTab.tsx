"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { getCompletedBonuses, updateCompletedBonus } from "@/lib/api/rules";
import {
  CompletedBonus,
  NotifyFn,
  SKILL_COLORS,
  SKILL_MAP,
} from "@/lib/types/rules";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";
import { Column, RuleTable } from "./RuleTable";
import { RuleDialog } from "./RuleDialog";
import { FormField } from "./FormField";

const columns: Column<CompletedBonus>[] = [
  {
    header: "Skill",
    width: 1.5,
    render: (bonus) => (
      <Chip
        label={SKILL_MAP[bonus.skill]}
        size="small"
        sx={{ ...styles.chip, bgcolor: SKILL_COLORS[bonus.skill] }}
      />
    ),
  },
  {
    header: "Level",
    width: 1.5,
    render: (bonus) => (
      <Chip
        label={bonus.level}
        size="small"
        variant="outlined"
        sx={styles.levelChip}
      />
    ),
  },
  {
    header: "Completed Bonus",
    width: 1,
    render: (bonus) => (
      <Typography variant="body2" sx={styles.mutedCellText}>
        {bonus.completed_bonus}
      </Typography>
    ),
  },
];

export function CompletedBonusTab({ notify }: { notify: NotifyFn }) {
  const [bonuses, setBonuses] = useState<CompletedBonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [bonusBeingEdited, setBonusBeingEdited] =
    useState<CompletedBonus | null>(null);

  async function loadBonuses() {
    setLoading(true);
    try {
      const data = (await getCompletedBonuses()) as CompletedBonus[];
      setBonuses(data);
    } catch {
      notify("Failed to load completed bonuses.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBonuses();
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
        rows={bonuses}
        onEdit={(bonus) => setBonusBeingEdited(bonus)}
      />

      {bonusBeingEdited ? (
        <EditCompletedBonusDialog
          bonus={bonusBeingEdited}
          onClose={() => setBonusBeingEdited(null)}
          onSaved={() => {
            setBonusBeingEdited(null);
            notify("Completed bonus updated successfully.", "success");
            loadBonuses();
          }}
        />
      ) : null}
    </>
  );
}

type EditCompletedBonusDialogProps = {
  bonus: CompletedBonus;
  onClose: () => void;
  onSaved: () => void;
};

function EditCompletedBonusDialog({
  bonus,
  onClose,
  onSaved,
}: EditCompletedBonusDialogProps) {
  const [bonusValue, setBonusValue] = useState(String(bonus.completed_bonus));
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  function validate() {
    if (bonusValue.trim() === "") {
      setError("Completed Bonus is required.");
      return false;
    }
    const value = Number(bonusValue);
    if (Number.isNaN(value) || value < 0) {
      setError("Completed Bonus must be 0 or more.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSave() {
    setServerError("");
    if (!validate()) {
      return;
    }

    setSaving(true);
    try {
      await updateCompletedBonus(bonus.id, {
        completed_bonus: Number(bonusValue),
      });
      onSaved();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setServerError(message);
      setSaving(false);
    }
  }

  return (
    <RuleDialog
      title="Edit Completed Bonus"
      saving={saving}
      serverError={serverError}
      onClose={onClose}
      onSave={handleSave}
    >
      <FormField label="Skill">
        <Typography sx={styles.fieldReadonlyValue}>
          {SKILL_MAP[bonus.skill]}
        </Typography>
      </FormField>

      <FormField label="Level">
        <Typography sx={styles.fieldReadonlyValue}>{bonus.level}</Typography>
      </FormField>

      <FormField label="Completed Bonus *" error={error}>
        <TextField
          fullWidth
          size="small"
          type="number"
          value={bonusValue}
          disabled={saving}
          onChange={(e) => setBonusValue(e.target.value)}
        />
      </FormField>
    </RuleDialog>
  );
}

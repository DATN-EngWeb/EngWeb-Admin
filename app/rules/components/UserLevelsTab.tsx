"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { getUserLevels, updateUserLevel } from "@/lib/api/rules";
import { NotifyFn, UserLevel } from "@/lib/types/rules";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";
import { Column, RuleTable } from "./RuleTable";
import { RuleDialog } from "./RuleDialog";
import { FormField } from "./FormField";

const columns: Column<UserLevel>[] = [
  {
    header: "Level",
    width: 2,
    render: (level) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {level.level_icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Box
            component="img"
            src={level.level_icon}
            alt={level.level_title}
            sx={styles.levelIcon}
          />
        ) : null}
        <Box>
          <Typography variant="body2" sx={styles.cellText}>
            Level {level.level_number}
          </Typography>
          <Typography variant="body2" sx={styles.mutedCellText}>
            {level.level_title}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    header: "Min XP",
    width: 1.5,
    render: (level) => (
      <Typography variant="body2" sx={styles.mutedCellText}>
        {level.min_xp}
      </Typography>
    ),
  },
  {
    header: "Max XP",
    width: 1.5,
    render: (level) => (
      <Typography variant="body2" sx={styles.mutedCellText}>
        {level.max_xp}
      </Typography>
    ),
  },
];

export function UserLevelsTab({ notify }: { notify: NotifyFn }) {
  const [levels, setLevels] = useState<UserLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelBeingEdited, setLevelBeingEdited] = useState<UserLevel | null>(
    null,
  );

  async function loadLevels() {
    setLoading(true);
    try {
      const data = (await getUserLevels()) as UserLevel[];
      setLevels(data);
    } catch {
      notify("Failed to load levels.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLevels();
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
        rows={levels}
        onEdit={(level) => setLevelBeingEdited(level)}
      />

      {levelBeingEdited ? (
        <EditLevelDialog
          level={levelBeingEdited}
          allLevels={levels}
          onClose={() => setLevelBeingEdited(null)}
          onSaved={() => {
            setLevelBeingEdited(null);
            notify("Level updated successfully.", "success");
            loadLevels();
          }}
        />
      ) : null}
    </>
  );
}

type EditLevelDialogProps = {
  level: UserLevel;
  allLevels: UserLevel[];
  onClose: () => void;
  onSaved: () => void;
};

function EditLevelDialog({
  level,
  allLevels,
  onClose,
  onSaved,
}: EditLevelDialogProps) {
  const [title, setTitle] = useState(level.level_title);
  const [icon, setIcon] = useState(level.level_icon ?? "");
  const [minXp, setMinXp] = useState(String(level.min_xp));
  const [maxXp, setMaxXp] = useState(String(level.max_xp));

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const [showIconPreview, setShowIconPreview] = useState(false);
  const [iconPreviewFailed, setIconPreviewFailed] = useState(false);

  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (title.trim() === "") {
      newErrors.title = "Level Title is required.";
    }

    const min = Number(minXp);
    const max = Number(maxXp);

    if (minXp.trim() === "") {
      newErrors.minXp = "Min XP is required.";
    } else if (Number.isNaN(min) || min < 0) {
      newErrors.minXp = "Min XP must be 0 or more.";
    }

    if (maxXp.trim() === "") {
      newErrors.maxXp = "Max XP is required.";
    } else if (Number.isNaN(max) || max < 0) {
      newErrors.maxXp = "Max XP must be 0 or more.";
    }

    if (!newErrors.minXp && !newErrors.maxXp) {
      if (min >= max) {
        newErrors.maxXp = "Max XP must be greater than Min XP.";
      }

      const isLowestLevel = !allLevels.some(
        (other) => other.level_number < level.level_number,
      );
      if (isLowestLevel && min !== 0) {
        newErrors.minXp = "The lowest level must start at Min XP 0.";
      }

      const higherLevels = allLevels
        .filter((other) => other.level_number > level.level_number)
        .sort((a, b) => a.level_number - b.level_number);
      const nextLevel = higherLevels[0];
      if (nextLevel && max > nextLevel.max_xp) {
        newErrors.maxXp = `Max XP cannot exceed the next level's Max XP (${nextLevel.max_xp}).`;
      }
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
      await updateUserLevel(level.id, {
        level_title: title.trim(),
        level_icon: icon.trim() === "" ? null : icon.trim(),
        min_xp: Number(minXp),
        max_xp: Number(maxXp),
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
      title="Edit User Level"
      saving={saving}
      serverError={serverError}
      onClose={onClose}
      onSave={handleSave}
      disableSave={iconPreviewFailed}
    >
      <FormField label="Level Title *" error={errors.title}>
        <TextField
          fullWidth
          size="small"
          value={title}
          disabled={saving}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormField>

      <FormField label="Level Icon URL" error={errors.icon}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            fullWidth
            size="small"
            value={icon}
            disabled={saving}
            onChange={(e) => {
              setIcon(e.target.value);
              // The URL changed, so let the preview try to load again.
              setIconPreviewFailed(false);
            }}
          />
          <Button
            variant="outlined"
            onClick={() => setShowIconPreview((previous) => !previous)}
            disabled={icon.trim() === ""}
          >
            {showIconPreview ? "Hide" : "Preview"}
          </Button>
        </Box>

        {showIconPreview && icon.trim() !== "" && !iconPreviewFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Box
            component="img"
            src={icon}
            alt="Level icon preview"
            sx={styles.iconPreview}
            onError={() => setIconPreviewFailed(true)}
          />
        ) : null}

        {iconPreviewFailed ? (
          <Typography variant="body2" sx={styles.fieldError}>
            Could not load an image from this URL.
          </Typography>
        ) : null}
      </FormField>

      <Box sx={styles.fieldRow}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <FormField label="Min XP *" error={errors.minXp}>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={minXp}
              disabled={saving}
              onChange={(e) => setMinXp(e.target.value)}
            />
          </FormField>
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <FormField label="Max XP *" error={errors.maxXp}>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={maxXp}
              disabled={saving}
              onChange={(e) => setMaxXp(e.target.value)}
            />
          </FormField>
        </Box>
      </Box>
    </RuleDialog>
  );
}

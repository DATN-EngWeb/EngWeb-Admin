"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { getStreakRewards, updateStreakReward } from "@/lib/api/rules";
import { NotifyFn, StreakRewardRule } from "@/lib/types/rules";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";
import { Column, RuleTable } from "./RuleTable";
import { RuleDialog } from "./RuleDialog";
import { FormField } from "./FormField";

const columns: Column<StreakRewardRule>[] = [
  {
    header: "Streak Day",
    width: 1,
    render: (reward) => (
      <Typography variant="body2" sx={styles.cellText}>
        Day {reward.streak_day}
      </Typography>
    ),
  },
  {
    header: "XP Reward",
    width: 1,
    render: (reward) => (
      <Typography variant="body2" sx={styles.mutedCellText}>
        {reward.xp_reward}
      </Typography>
    ),
  },
  {
    header: "AI Turn Reward",
    width: 1,
    render: (reward) => (
      <Typography variant="body2" sx={styles.mutedCellText}>
        {reward.ai_turn_reward}
      </Typography>
    ),
  },
];

export function StreakRewardTab({ notify }: { notify: NotifyFn }) {
  const [rewards, setRewards] = useState<StreakRewardRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [rewardBeingEdited, setRewardBeingEdited] =
    useState<StreakRewardRule | null>(null);

  async function loadRewards() {
    setLoading(true);
    try {
      const data = (await getStreakRewards()) as StreakRewardRule[];
      setRewards(data);
    } catch {
      notify("Failed to load streak rewards.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRewards();
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
        rows={rewards}
        onEdit={(reward) => setRewardBeingEdited(reward)}
      />

      {rewardBeingEdited ? (
        <EditStreakRewardDialog
          reward={rewardBeingEdited}
          onClose={() => setRewardBeingEdited(null)}
          onSaved={() => {
            setRewardBeingEdited(null);
            notify("Streak reward updated successfully.", "success");
            loadRewards();
          }}
        />
      ) : null}
    </>
  );
}

type EditStreakRewardDialogProps = {
  reward: StreakRewardRule;
  onClose: () => void;
  onSaved: () => void;
};

function EditStreakRewardDialog({
  reward,
  onClose,
  onSaved,
}: EditStreakRewardDialogProps) {
  const [xpReward, setXpReward] = useState(String(reward.xp_reward));
  const [aiTurnReward, setAiTurnReward] = useState(
    String(reward.ai_turn_reward),
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  function validate() {
    const newErrors: { [key: string]: string } = {};

    const xp = Number(xpReward);
    const aiTurns = Number(aiTurnReward);

    if (xpReward.trim() === "") {
      newErrors.xpReward = "XP Reward is required.";
    } else if (Number.isNaN(xp) || xp < 0) {
      newErrors.xpReward = "XP Reward must be 0 or more.";
    }

    if (aiTurnReward.trim() === "") {
      newErrors.aiTurnReward = "AI Turn Reward is required.";
    } else if (Number.isNaN(aiTurns) || aiTurns < 0) {
      newErrors.aiTurnReward = "AI Turn Reward must be 0 or more.";
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
      await updateStreakReward(reward.id, {
        xp_reward: Number(xpReward),
        ai_turn_reward: Number(aiTurnReward),
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
      title="Edit Streak Reward"
      saving={saving}
      serverError={serverError}
      onClose={onClose}
      onSave={handleSave}
    >
      <FormField label="Streak Day">
        <Typography sx={styles.fieldReadonlyValue}>
          Day {reward.streak_day}
        </Typography>
      </FormField>

      <FormField label="XP Reward *" error={errors.xpReward}>
        <TextField
          fullWidth
          size="small"
          type="number"
          value={xpReward}
          disabled={saving}
          onChange={(e) => setXpReward(e.target.value)}
        />
      </FormField>

      <FormField label="AI Turn Reward *" error={errors.aiTurnReward}>
        <TextField
          fullWidth
          size="small"
          type="number"
          value={aiTurnReward}
          disabled={saving}
          onChange={(e) => setAiTurnReward(e.target.value)}
        />
      </FormField>
    </RuleDialog>
  );
}

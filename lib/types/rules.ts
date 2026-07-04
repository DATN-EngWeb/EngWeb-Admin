export type UserLevel = {
  id: number;
  level_number: number;
  level_title: string;
  level_icon: string | null;
  min_xp: number;
  max_xp: number;
};

export type SkillCode = "R" | "L" | "S" | "W";
export type LevelCode = "A1" | "A2" | "B1" | "B2";

export type CompletedBonus = {
  id: number;
  skill: SkillCode;
  level: LevelCode;
  completed_bonus: number;
};

export type EXPBonusRule = {
  id: number;
  min_percentage: number;
  max_percentage: number;
  exp_percentage: number;
  rating: string;
  feedback_message: string;
};

export type StreakRewardRule = {
  id: number;
  streak_day: number;
  xp_reward: number;
  ai_turn_reward: number;
};

export type Quota = {
  default_limit: number;
  default_period_seconds: number;
  updated_at?: string;
};

export const SKILL_MAP: Record<SkillCode, string> = {
  R: "Reading",
  L: "Listening",
  S: "Speaking",
  W: "Writing",
};

export const SKILL_COLORS: Record<SkillCode, string> = {
  R: "#2563EB",
  L: "#10B981",
  S: "#F59E0B",
  W: "#EC4899",
};

export type NotifyFn = (message: string, severity: "success" | "error") => void;

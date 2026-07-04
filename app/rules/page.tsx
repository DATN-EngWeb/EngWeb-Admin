"use client";

import { useState } from "react";
import { Alert, Box, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Header } from "@/components/Admin/Header";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";
import { UserLevelsTab } from "./components/UserLevelsTab";
import { CompletedBonusTab } from "./components/CompletedBonusTab";
import { ExpBonusRuleTab } from "./components/ExpBonusRuleTab";
import { StreakRewardTab } from "./components/StreakRewardTab";
import { QuotaTab } from "./components/QuotaTab";

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState("levels");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  function showMessage(message: string, severity: "success" | "error") {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }

  return (
    <Box sx={styles.container}>
      <Sidebar />
      <Box sx={styles.mainContent}>
        <Header />
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.titleSection}>
            <Box sx={styles.headerRow}>
              <Box>
                <Typography variant="h4" sx={styles.title}>
                  Rules
                </Typography>
                <Typography variant="body1" sx={styles.subtitle}>
                  Configure rules for levels, bonuses, EXP and streaks.
                </Typography>
              </Box>
            </Box>

            <Box sx={styles.tabsContainer}>
              <Tabs
                value={activeTab}
                onChange={(_, value) => setActiveTab(value)}
                sx={styles.tabs}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab value="levels" label="User Levels" />
                <Tab value="bonus" label="Completed Bonus" />
                <Tab value="exp" label="EXP Bonus Rules" />
                <Tab value="streak" label="Streak Rewards" />
                <Tab value="quota" label="Quota" />
              </Tabs>
            </Box>
          </Box>

          {activeTab === "levels" && <UserLevelsTab notify={showMessage} />}
          {activeTab === "bonus" && <CompletedBonusTab notify={showMessage} />}
          {activeTab === "exp" && <ExpBonusRuleTab notify={showMessage} />}
          {activeTab === "streak" && <StreakRewardTab notify={showMessage} />}
          {activeTab === "quota" && <QuotaTab notify={showMessage} />}
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

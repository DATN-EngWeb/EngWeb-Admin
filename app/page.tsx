"use client";

import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Header } from "@/components/Admin/Header";
import {
  People,
  PendingActions,
  AccountCircle,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { dashboardStyles } from "@/styles/Dashboard/DashboardStyles";
import { getUserOverview } from "@/lib/api/users";
import { useEffect, useState } from "react";

export default function Home() {
  const [userOverview, setUserOverview] = useState(null);

  useEffect(() => {
    const fetchUserOverview = async () => {
      try {
        const response = await getUserOverview();
        setUserOverview(response);
      } catch (error) {
        console.error("Failed to fetch user overview:", error);
      }
    };

    fetchUserOverview();
  }, []);

  const router = useRouter();

  const menuItems = [
    {
      title: "Users",
      description: "Manage all users in the system",
      icon: People,
      path: "/users",
      color: "info.main",
      bgColor: "info.light",
    },
    {
      title: "Pending Approvals",
      description: "Review pending account requests",
      icon: PendingActions,
      path: "/pending",
      color: "warning.main",
      bgColor: "warning.light",
    },
    {
      title: "Profile",
      description: "View and edit your profile",
      icon: AccountCircle,
      path: "/profile",
      color: "success.main",
      bgColor: "success.light",
    },
  ];

  return (
    <Box sx={dashboardStyles.container}>
      <Sidebar />
      <Box sx={dashboardStyles.mainContent}>
        <Header />
        <Box sx={dashboardStyles.contentWrapper}>
          <Box sx={dashboardStyles.titleSection}>
            <Typography variant="h3" sx={dashboardStyles.title}>
              Welcome to Admin Dashboard
            </Typography>
            <Typography variant="h6" sx={dashboardStyles.subtitle}>
              Manage your English learning platform efficiently
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Grid item xs={12} md={6} lg={4} key={item.path}>
                  <Paper
                    sx={dashboardStyles.menuCard}
                    onClick={() => router.push(item.path)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          ...dashboardStyles.iconBox,
                          bgcolor: item.bgColor,
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: item.color }} />
                      </Box>
                      <Typography variant="h5" sx={dashboardStyles.menuTitle}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={dashboardStyles.menuDescription}
                    >
                      {item.description}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={dashboardStyles.statsSection}>
            <Typography variant="h5" sx={dashboardStyles.statsTitle}>
              Quick Stats
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    ...dashboardStyles.statCard,
                    bgcolor: "#E3F2FD",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ ...dashboardStyles.statValue, color: "#2196F3" }}
                  >
                    {userOverview?.total_users ?? "--"}
                  </Typography>
                  <Typography variant="body1" sx={dashboardStyles.statLabel}>
                    Total Users
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    ...dashboardStyles.statCard,
                    bgcolor: "#FFF3E0",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ ...dashboardStyles.statValue, color: "#FF9800" }}
                  >
                    {userOverview?.pending_approvals ?? "--"}
                  </Typography>
                  <Typography variant="body1" sx={dashboardStyles.statLabel}>
                    Pending Approvals
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    ...dashboardStyles.statCard,
                    bgcolor: "#E8F5E9",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ ...dashboardStyles.statValue, color: "#4CAF50" }}
                  >
                    {userOverview?.active_users ?? "--"}
                  </Typography>
                  <Typography variant="body1" sx={dashboardStyles.statLabel}>
                    Active Users
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

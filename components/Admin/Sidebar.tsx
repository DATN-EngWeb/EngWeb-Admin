"use client";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { People, PersonAdd, Settings, Logout } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";
import { sidebarStyles } from "@/styles/Components/SidebarStyles";

const menuItems = [
  { text: "Users", icon: People, path: "/users" },
  { text: "Pending Account", icon: PersonAdd, path: "/pending" },
  { text: "My Profile", icon: Settings, path: "/profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isMenuItemActive = (itemPath) =>
    pathname === itemPath || pathname.startsWith(`${itemPath}/`);

  return (
    <Box sx={sidebarStyles.container}>
      <Link href="/">
        <Box
          sx={{
            ...sidebarStyles.logoBox,
            cursor: "pointer",
          }}
        >
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={150}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Link>
      <Box sx={sidebarStyles.menuHeader}>
        <Typography variant="caption" sx={sidebarStyles.menuTitle}>
          MAIN MENU
        </Typography>
      </Box>

      <List sx={sidebarStyles.menuList}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = isMenuItemActive(item.path);
          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={sidebarStyles.menuItem}
            >
              <ListItemButton
                component={Link}
                href={item.path}
                sx={sidebarStyles.menuButton(isActive)}
              >
                <ListItemIcon sx={sidebarStyles.menuIcon(isActive)}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: sidebarStyles.menuText(isActive),
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={sidebarStyles.logoutSection}>
        <ListItemButton sx={sidebarStyles.logoutButton} onClick={logout}>
          <ListItemIcon sx={sidebarStyles.logoutIcon}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              sx: sidebarStyles.logoutText,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}

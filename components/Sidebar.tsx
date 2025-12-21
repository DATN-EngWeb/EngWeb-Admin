'use client'

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { People, PersonAdd, Settings } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const menuItems = [
  { text: 'Users', icon: People, path: '/users' },
  { text: 'Pending Account', icon: PersonAdd, path: '/pending' },
  { text: 'My Profile', icon: Settings, path: '/profile' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={150}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Box sx={{ px: 3, mb: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          MAIN MENU
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'warning.light' : 'transparent',
                  '&:hover': {
                    bgcolor: isActive ? 'warning.light' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'secondary.main' : 'text.secondary',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      color: 'primary.main',
                      fontWeight: isActive ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}


'use client'

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { People, PersonAdd, Settings } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { text: 'List Users', icon: People, path: '/' },
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
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#F5C842',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
            N
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
          NENS
        </Typography>
      </Box>

      {/* Main Menu */}
      <Box sx={{ px: 3, mb: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: '#666',
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
                  bgcolor: isActive ? '#FFF9E6' : 'transparent',
                  '&:hover': {
                    bgcolor: isActive ? '#FFF9E6' : '#F5F5F5',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? '#F5C842' : '#999',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      color: '#8B4513',
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


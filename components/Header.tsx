'use client'

import { Box, Typography, Avatar, Button, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const { logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    logout()
  }

  return (
    <Box
      sx={{
        height: 80,
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: 4,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 280,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1" sx={{ color: '#8B4513', fontWeight: 500 }}>
          Admin Manager
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#E0E0E0',
              fontSize: '0.875rem',
            }}
          >
            A
          </Avatar>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}


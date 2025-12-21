'use client'

import { Box, Typography, Avatar, Button, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useState } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { headerStyles } from '@/styles/Components/HeaderStyles'

export function Header() {
  const { logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
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
    <Box sx={headerStyles.container}>
      <Box sx={headerStyles.userSection}>
        <Typography variant="body1" sx={headerStyles.userName}>
          Admin Manager
        </Typography>
        <Box sx={headerStyles.avatarButton} onClick={handleClick}>
          <Avatar sx={headerStyles.avatar}>
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
            <Logout sx={headerStyles.logoutIcon} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

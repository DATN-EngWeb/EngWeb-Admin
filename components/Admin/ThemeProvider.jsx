'use client'

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@/lib/theme/theme'

export function ThemeProvider({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}


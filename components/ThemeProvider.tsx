'use client'

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5C842', // Yellow
    },
    secondary: {
      main: '#8B4513', // Dark brown
    },
    background: {
      default: '#F5F5F0', // Light beige
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}


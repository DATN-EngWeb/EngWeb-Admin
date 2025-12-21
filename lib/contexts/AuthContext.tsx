'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated from localStorage
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated')
      if (authStatus === 'true') {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated')
      const isAuth = authStatus === 'true'
      
      // Redirect to login if not authenticated and not on login page
      if (!isAuth && pathname !== '/login') {
        router.push('/login')
      }
      // Redirect to home if authenticated and on login page
      if (isAuth && pathname === '/login') {
        router.push('/')
      }
    }
  }, [isLoading, pathname, router])

  const login = () => {
    setIsAuthenticated(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true')
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated')
    }
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    username: string;
    avatar: string;
    userId: string;
  } | null;
  refreshUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{
    username: string;
    avatar: string;
    userId: string;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = [
    "/login",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];

  const refreshUser = () => {
    if (typeof window === "undefined") return;
    const username = localStorage.getItem("username") || "";
    const avatar = localStorage.getItem("avatar") || "";
    const userId = localStorage.getItem("userId") || "";
    setUser({
      username,
      avatar,
      userId,
    });
  };

  useEffect(() => {
    // Check if user is authenticated from localStorage
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated");
      if (authStatus === "true") {
        setIsAuthenticated(true);
        document.cookie =
          "isAuthenticated=true; path=/; max-age=604800; samesite=lax";
        refreshUser();
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated");
      const isAuth = authStatus === "true";

      const isPublicRoute = publicRoutes.includes(pathname);

      // Redirect to login if not authenticated and not on a public auth page
      if (!isAuth && !isPublicRoute) {
        router.replace("/login");
      }
      // Redirect to home if authenticated and on login page
      if (isAuth && pathname === "/login") {
        router.replace("/");
      }

      if (isAuth) {
        refreshUser();
      }
    }
  }, [isLoading, pathname, router]);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
      localStorage.removeItem("userId");
      document.cookie = "isAuthenticated=; path=/; max-age=0; samesite=lax";
    }
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

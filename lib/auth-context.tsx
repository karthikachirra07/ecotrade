"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { User, UserRole } from "./types";
import { mockSellers } from "./data";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  pincode: string;
  city: string;
  farmName?: string;
  farmDescription?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USERS_KEY = "ecotrade_users";
const CURRENT_USER_KEY = "ecotrade_current_user";

// Initialize users with mock sellers
function initializeUsers(): User[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize with mock sellers
  localStorage.setItem(USERS_KEY, JSON.stringify(mockSellers));
  return mockSellers;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize users and check for existing session
    initializeUsers();
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    
    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role,
      pincode: userData.pincode,
      city: userData.city,
      createdAt: new Date().toISOString(),
      ...(userData.role === "seller" && {
        farmName: userData.farmName,
        farmDescription: userData.farmDescription,
        organicCertified: false,
        practicesDescription: "",
      }),
      ...(userData.role === "consumer" && {
        address: userData.address,
      }),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users list
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
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

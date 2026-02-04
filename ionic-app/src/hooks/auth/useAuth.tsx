import type { ApiResponse, CustomError } from '@/types/api.model';
import type { LoginFormData, User } from '@/types/auth.model';
import type { UseMutationResult } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginFormData) => void;
  logout: () => void;
  loginState: UseMutationResult<ApiResponse<{ user: User }>, CustomError, LoginFormData>;
  logoutState: UseMutationResult<ApiResponse<{ ok: boolean }>, CustomError, void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

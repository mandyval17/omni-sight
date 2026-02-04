import AuthService from '@/services/auth/auth.service';
import type { LoginFormData, User } from '@/types/auth.model';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './useAuth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = AuthService.useUserLoginMutation();
  const logoutMutation = AuthService.useUserLogoutMutation();

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await AuthService.me();
        if (res?.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(
    (data: LoginFormData) => {
      loginMutation.mutate(data, {
        onSuccess: (res) => {
          if (res?.data?.user) setUser(res.data.user);
          navigate('/home');
        },
      });
    },
    [loginMutation, navigate]
  );

  const logout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        setUser(null);
        navigate('/login');
      },
    });
  }, [logoutMutation, navigate]);

  const value = {
    isLoading,
    user,
    login,
    logout,
    loginState: loginMutation,
    logoutState: logoutMutation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

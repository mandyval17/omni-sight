import AuthService from '@/services/auth/auth.service';
import type { LoginFormData, User } from '@/types/auth.model';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './useAuth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = AuthService.useUserLoginMutation();
  const logoutMutation = AuthService.useUserLogoutMutation();

  // Check auth status on mount
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await AuthService.me();
        if (isMounted) {
          if (res?.data) {
            setUser(res.data);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.log('Auth check failed:', err);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(
    (data: LoginFormData) => {
      loginMutation.mutate(data, {
        onSuccess: (res) => {
          if (res?.data?.user) setUser(res.data.user);
          history.push('/home');
        },
      });
    },
    [loginMutation, history]
  );

  const logout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        setUser(null);
        history.push('/login');
      },
    });
  }, [logoutMutation, history]);

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

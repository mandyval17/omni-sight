import { SplashScreen } from '@/components/ui/SplashScreen';
import { useAuth } from '@/hooks/auth/useAuth';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  guestOnly?: boolean;
}

export function AuthGuard({ children, guestOnly = false }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (guestOnly) {
      if (user) {
        history.replace('/dashboard');
      }
    } else {
      if (!user) {
        history.replace(`/login?from=${encodeURIComponent(location.pathname)}`);
      }
    }
  }, [guestOnly, user, isLoading, history, location.pathname]);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (guestOnly && user) return null;
  if (!guestOnly && !user) return null;

  return <>{children}</>;
}

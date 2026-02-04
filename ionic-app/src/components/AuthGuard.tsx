import { useAuth } from '@/hooks/auth/useAuth';
import { Box, CircularProgress } from '@mui/material';
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
        history.replace('/home');
      }
    } else {
      if (!user) {
        history.replace(`/login?from=${encodeURIComponent(location.pathname)}`);
      }
    }
  }, [guestOnly, user, isLoading, history, location.pathname]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (guestOnly && user) return null;
  if (!guestOnly && !user) return null;

  return <>{children}</>;
}

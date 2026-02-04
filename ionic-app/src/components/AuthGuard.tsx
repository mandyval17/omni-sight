import { useAuth } from '@/hooks/auth/useAuth';
import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  guestOnly?: boolean;
}

export function AuthGuard({ children, guestOnly = false }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (guestOnly) {
      // Guest-only route but user is logged in
      if (user) {
        navigate('/home', { replace: true });
      }
    } else {
      // Protected route but user is not logged in
      if (!user) {
        navigate(`/login?from=${encodeURIComponent(location.pathname)}`, { replace: true });
      }
    }
  }, [guestOnly, user, isLoading, navigate, location.pathname]);

  if (isLoading) {
    return (
      <Backdrop
        open
        sx={{
          bgcolor: 'background.default',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="primary" size={48} />
      </Backdrop>
    );
  }

  // Don't render if redirect is needed
  if (guestOnly && user) return null;
  if (!guestOnly && !user) return null;

  return <>{children}</>;
}

import { radius } from '@/theme/theme';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Box } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';

/**
 * Desktop-only left sidebar – same 5 nav items as bottom nav, active blue glow.
 */
function AIcon({ active }: { active?: boolean }) {
  return (
    <Box
      component="span"
      sx={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: active ? 'primary.main' : 'text.secondary',
        fontStyle: 'italic',
        ...(active && {
          textShadow: '0 0 12px rgba(34, 211, 238, 0.6)',
        }),
      }}
    >
      a
    </Box>
  );
}

const NAV_ITEMS: {
  path: string;
  icon: React.ComponentType<{ sx?: object }> | typeof AIcon;
  label: string;
  isAi?: boolean;
}[] = [
    { path: '/dashboard', icon: ShoppingBagOutlinedIcon, label: 'Bag' },
    { path: '/insights', icon: AnalyticsOutlinedIcon, label: 'Analytics' },
    { path: '/home', icon: HomeOutlinedIcon, label: 'Home' },
    { path: '/search', icon: SearchIcon, label: 'Search' },
    { path: '/ai', icon: AIcon, label: 'AI', isAi: true },
  ];

export function DesktopSidebar() {
  const location = useLocation();
  const history = useHistory();

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        width: 80,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        py: 2,
        alignItems: 'center',
        gap: 1,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const active =
          location.pathname === item.path ||
          (item.path === '/ai' && location.pathname === '/dashboard');
        const Icon = item.icon;
        return (
          <Box
            key={item.path}
            onClick={() => history.push(item.path)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: radius.md,
              cursor: 'pointer',
              color: active ? 'primary.main' : 'text.secondary',
              ...(active && {
                bgcolor: 'rgba(34, 211, 238, 0.08)',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.25)',
              }),
              '&:hover': {
                bgcolor: 'action.hover',
                color: 'primary.main',
              },
            }}
          >
            {item.isAi ? (
              <AIcon active={active} />
            ) : (
              <Icon sx={{ fontSize: 26 }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

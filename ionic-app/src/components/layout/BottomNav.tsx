import { colors, typography } from '@/theme/theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import { Box, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';

function AiIcon({ active }: { active?: boolean }) {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: typography.fontFamily.sans,
        fontWeight: typography.fontWeight.bold,
        fontSize: 20,
        fontStyle: 'italic',
        color: active ? colors.primary : 'rgba(255, 255, 255, 0.5)',
        lineHeight: 1,
        textShadow: active ? `0 0 12px ${colors.primaryGlow}` : 'none',
      }}
    >
      a
    </Typography>
  );
}

const NAV_ITEMS = [
  { path: '/shop', icon: LocalMallOutlinedIcon, label: 'Shop' },
  { path: '/analytics', icon: ShowChartOutlinedIcon, label: 'Analytics' },
  { path: '/home', icon: HomeOutlinedIcon, label: 'Home' },
  { path: '/search', icon: ManageSearchOutlinedIcon, label: 'Search' },
  { path: '/ai', icon: null, label: 'AI', isAi: true },
];

export function BottomNav() {
  const location = useLocation();
  const history = useHistory();

  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        bgcolor: '#151515',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          maxWidth: 430,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          px: 4,
          py: 3,
          pb: 'max(24px, env(safe-area-inset-bottom))',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.isAi && location.pathname === '/dashboard');

          return (
            <Box
              key={item.path}
              onClick={() => history.push(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                cursor: 'pointer',
                color: isActive ? colors.primary : 'rgba(255, 255, 255, 0.5)',
                transition: 'color 0.2s ease',
                '&:hover': { color: colors.primary },
              }}
            >
              {item.isAi ? (
                <AiIcon active={isActive} />
              ) : (
                item.icon && <item.icon sx={{ fontSize: 24 }} />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

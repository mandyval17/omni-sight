import { colors, typography } from '@/theme/theme';
import { Box, IconButton, Typography } from '@mui/material';

export function DashboardHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        px: 3,
        maxWidth: 430,
        mx: 'auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Hamburger menu */}
      <IconButton
        sx={{
          width: 44,
          height: 44,
          bgcolor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.12)' },
        }}
      >
        <Box sx={{ width: 16, height: 2, bgcolor: colors.text, borderRadius: 1 }} />
        <Box sx={{ width: 16, height: 2, bgcolor: colors.text, borderRadius: 1 }} />
      </IconButton>

      {/* Brand */}
      <Typography
        sx={{
          fontFamily: typography.fontFamily.sans,
          fontWeight: typography.fontWeight.regular,
          fontSize: '20px',
          letterSpacing: '-0.02em',
        }}
      >
        <Box component="span" sx={{ color: colors.text }}>ratn</Box>
        <Box component="span" sx={{ color: colors.primary, fontStyle: 'italic' }}>ai</Box>
      </Typography>
    </Box>
  );
}

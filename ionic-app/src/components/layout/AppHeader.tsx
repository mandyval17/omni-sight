import { Box, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface AppHeaderProps {
  title?: string;
  logo?: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export function AppHeader({ title = 'Omnisight', logo, leftSlot, rightSlot }: AppHeaderProps) {
  return (
    <Toolbar
      disableGutters
      sx={{
        minHeight: { xs: 56, sm: 64 },
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
        {logo}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #22d3ee 0%, #0d9488 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
      </Box>
      {leftSlot}
      <Box sx={{ flex: 1 }} />
      {rightSlot}
    </Toolbar>
  );
}

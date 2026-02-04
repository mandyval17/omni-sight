import { radius } from '@/theme/theme';
import { Card, CardContent, CardHeader } from '@mui/material';
import { ReactNode } from 'react';

interface AppCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  padding?: number;
  noPadding?: boolean;
}

export function AppCard({
  title,
  subtitle,
  action,
  children,
  padding = 3,
  noPadding,
}: AppCardProps) {
  return (
    <Card
      sx={{
        borderRadius: radius.lg,
        overflow: 'hidden',
      }}
    >
      {(title || action) && (
        <CardHeader
          title={title}
          subheader={subtitle}
          action={action}
          sx={{
            px: padding,
            py: 2,
            '& .MuiCardHeader-title': { fontSize: '1rem', fontWeight: 600 },
            '& .MuiCardHeader-subheader': { fontSize: '0.875rem', color: 'text.secondary' },
          }}
        />
      )}
      <CardContent sx={noPadding ? { p: 0 } : { px: padding, py: title ? 0 : padding, '&:last-child': { pb: padding } }}>
        {children}
      </CardContent>
    </Card>
  );
}

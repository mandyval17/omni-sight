import { radius } from '@/theme/theme';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface AppSidebarProps {
  width?: number;
  items: SidebarItem[];
  header?: ReactNode;
  footer?: ReactNode;
}

export function AppSidebar({ width = 260, items, header, footer }: AppSidebarProps) {
  return (
    <Box
      component="aside"
      sx={{
        width,
        flexShrink: 0,
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {header}
      <List sx={{ py: 1, px: 1 }}>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={item.onClick}
            href={item.href}
            sx={{
              borderRadius: radius.md,
              mb: 0.5,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            {item.icon && <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>
        ))}
      </List>
      {footer && <Box sx={{ mt: 'auto', p: 2 }}>{footer}</Box>}
    </Box>
  );
}

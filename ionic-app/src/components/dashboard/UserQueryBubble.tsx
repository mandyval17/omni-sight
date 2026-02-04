import { colors, typography } from '@/theme/theme';
import { Box, Typography } from '@mui/material';

type UserQueryBubbleProps = {
  query: string;
};

/**
 * User query bubble from Figma (node 2186:1100)
 * Position: right-aligned, dark background with rounded corners
 */
export function UserQueryBubble({ query }: UserQueryBubbleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        mb: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 303,
          px: 2,
          py: 1.5,
          bgcolor: 'rgba(30, 40, 50, 0.9)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          sx={{
            fontFamily: typography.fontFamily.sans,
            fontSize: '14px',
            fontWeight: typography.fontWeight.regular,
            color: colors.text,
            lineHeight: 1.4,
          }}
        >
          {query}
        </Typography>
      </Box>
    </Box>
  );
}

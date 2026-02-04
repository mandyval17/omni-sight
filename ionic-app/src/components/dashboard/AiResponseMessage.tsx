import { colors, typography } from '@/theme/theme';
import { Box, Typography } from '@mui/material';

type AiResponseMessageProps = {
  message: string;
};

/**
 * AI response message from Figma (node 2186:1129)
 * Cyan orb icon on left, message text on right
 */
export function AiResponseMessage({ message }: AiResponseMessageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        width: '100%',
        mb: 3,
      }}
    >
      {/* Cyan orb indicator */}
      <Box
        sx={{
          width: 32,
          height: 32,
          minWidth: 32,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          boxShadow: `0 0 12px ${colors.primaryGlow}`,
          flexShrink: 0,
          mt: 0.5,
        }}
      />

      {/* Message text */}
      <Typography
        sx={{
          fontFamily: typography.fontFamily.sans,
          fontSize: '14px',
          fontWeight: typography.fontWeight.regular,
          color: colors.text,
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}

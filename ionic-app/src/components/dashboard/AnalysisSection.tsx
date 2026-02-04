import { colors, typography } from '@/theme/theme';
import { Box, Typography } from '@mui/material';

type AnalysisSectionProps = {
  content: string;
};

/**
 * Analysis section from Figma (node 2186:1244)
 * Title "Analysis" with long-form text content
 */
export function AnalysisSection({ content }: AnalysisSectionProps) {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Divider line */}
      <Box sx={{ width: '100%', height: 1, bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />

      {/* Title */}
      <Typography
        sx={{
          fontFamily: typography.fontFamily.sans,
          fontSize: '16px',
          fontWeight: typography.fontWeight.semibold,
          color: colors.text,
          mb: 2,
        }}
      >
        Analysis
      </Typography>

      {/* Content */}
      <Typography
        sx={{
          fontFamily: typography.fontFamily.sans,
          fontSize: '14px',
          fontWeight: typography.fontWeight.regular,
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: 1.6,
        }}
      >
        {content}
      </Typography>
    </Box>
  );
}

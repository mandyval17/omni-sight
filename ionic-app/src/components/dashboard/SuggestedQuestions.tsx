import { colors, typography } from '@/theme/theme';
import CallMadeIcon from '@mui/icons-material/CallMade';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Typography } from '@mui/material';

const SUGGESTIONS = [
  "Today's sales analysis",
  'Comparative monthly performance',
  'Yearly revenue growth overview',
];

type SuggestedQuestionsProps = {
  onSelect: (question: string) => void;
};

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#1e1e1e',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {SUGGESTIONS.map((q, i) => (
        <Box
          key={q}
          onClick={() => onSelect(q)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: i < SUGGESTIONS.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
            cursor: 'pointer',
            transition: 'background 0.15s ease',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, flex: 1 }}>
            <HistoryIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.5)', flexShrink: 0 }} />
            <Typography
              sx={{
                fontFamily: typography.fontFamily.sans,
                fontSize: '14px',
                color: colors.text,
                opacity: 0.8,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {q}
            </Typography>
          </Box>
          <CallMadeIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.3)', transform: 'rotate(45deg)', flexShrink: 0, ml: 1 }} />
        </Box>
      ))}
    </Box>
  );
}

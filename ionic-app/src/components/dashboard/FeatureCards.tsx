import { colors, typography } from '@/theme/theme';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Box, Typography } from '@mui/material';

const CARDS = [
  { id: 'lost-sales', icon: QueryStatsIcon, title: 'Lost Sales', subtitle: 'Analysis' },
  { id: 'shopper-group', icon: GroupsIcon, title: 'Shopper Group', subtitle: 'Composition' },
  { id: 'vip-timeline', icon: EmojiEventsIcon, title: 'VIP Walk-in', subtitle: 'Timeline' },
];

function CardItem({ card }: { card: (typeof CARDS)[0] }) {
  const Icon = card.icon;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        padding: '14px',
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        flexShrink: 0,
        minWidth: 160,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          minWidth: 38,
          borderRadius: '8px',
          backgroundColor: colors.primaryDark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 20, color: colors.primary }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Typography
          sx={{
            color: colors.text,
            fontFamily: typography.fontFamily.sans,
            fontWeight: typography.fontWeight.medium,
            fontSize: '13px',
            lineHeight: 1.3,
          }}
        >
          {card.title}
        </Typography>
        <Typography
          sx={{
            color: colors.textMuted,
            fontFamily: typography.fontFamily.sans,
            fontSize: '11px',
            lineHeight: 1.3,
            mt: 0.25,
          }}
        >
          {card.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export function FeatureCards() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        width: '100%',
        pb: 1,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {CARDS.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </Box>
  );
}

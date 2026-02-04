import { colors, typography } from '@/theme/theme';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography } from '@mui/material';

const CHART_DATA = [
  { time: '9am', value: 18 },
  { time: '1pm', value: 25 },
  { time: '4pm', value: 42 },
  { time: '7pm', value: 15 },
  { time: '9pm', value: 12 },
];

const Y_LABELS = ['50', '40', '30', '20', '10', '0'];

export function TrafficChart() {
  const maxValue = 50;
  const chartHeight = 180;

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'rgba(20, 25, 30, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        p: 2,
        mb: 2,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontFamily: typography.fontFamily.sans, fontSize: '15px', fontWeight: typography.fontWeight.medium, color: colors.text }}>
          Traffic by Time
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 0.5, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', cursor: 'pointer' }}>
          <Typography sx={{ fontFamily: typography.fontFamily.sans, fontSize: '13px', color: colors.text }}>3 months</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: colors.text }} />
        </Box>
      </Box>

      {/* Chart Area */}
      <Box sx={{ position: 'relative', height: chartHeight + 30 }}>
        {/* Y-axis labels */}
        <Box sx={{ position: 'absolute', left: 0, top: 0, height: chartHeight, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {Y_LABELS.map((label) => (
            <Typography key={label} sx={{ fontFamily: typography.fontFamily.sans, fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', width: 20, textAlign: 'right' }}>
              {label}
            </Typography>
          ))}
        </Box>

        {/* Chart SVG */}
        <Box sx={{ position: 'absolute', left: 28, right: 0, top: 0, height: chartHeight }}>
          <svg width="100%" height={chartHeight} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="0" y1={`${(i * 100) / 4}%`} x2="100%" y2={`${(i * 100) / 4}%`} stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="4 4" />
            ))}

            {/* Hatched area */}
            <defs>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Area fill */}
            <polygon
              points={`0,${chartHeight} ${CHART_DATA.map((d, i) => `${(i / (CHART_DATA.length - 1)) * 100}%,${chartHeight - (d.value / maxValue) * chartHeight}`).join(' ')} 100%,${chartHeight}`}
              fill="url(#hatch)"
            />

            {/* Line */}
            <polyline
              points={CHART_DATA.map((d, i) => `${(i / (CHART_DATA.length - 1)) * 100}%,${chartHeight - (d.value / maxValue) * chartHeight}`).join(' ')}
              fill="none"
              stroke={colors.text}
              strokeWidth="2"
            />

            {/* Data points */}
            {CHART_DATA.map((d, i) => (
              <circle
                key={i}
                cx={`${(i / (CHART_DATA.length - 1)) * 100}%`}
                cy={chartHeight - (d.value / maxValue) * chartHeight}
                r={d.value === 42 ? 5 : 3}
                fill={d.value === 42 ? colors.primary : colors.text}
              />
            ))}
          </svg>

          {/* Tooltip for peak */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: chartHeight - (42 / maxValue) * chartHeight - 35,
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.5,
              bgcolor: 'rgba(30, 40, 50, 0.95)',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.primary }} />
            <Typography sx={{ fontFamily: typography.fontFamily.sans, fontSize: '11px', color: colors.text }}>34 Customers</Typography>
          </Box>
        </Box>

        {/* X-axis labels */}
        <Box sx={{ position: 'absolute', left: 28, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between' }}>
          {CHART_DATA.map((d) => (
            <Typography key={d.time} sx={{ fontFamily: typography.fontFamily.sans, fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
              {d.time}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Typography sx={{ fontFamily: typography.fontFamily.sans, fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)' }}>Generated Graph</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
          <BookmarkBorderIcon sx={{ fontSize: 14, color: colors.primary }} />
          <Typography sx={{ fontFamily: typography.fontFamily.sans, fontSize: '12px', color: colors.primary }}>Save Widget</Typography>
        </Box>
      </Box>
    </Box>
  );
}

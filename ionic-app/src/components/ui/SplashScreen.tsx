/**
 * Splash / loading screen matching Figma design (node 2186-666).
 * Dark background, dark teal–green gradient at top, central light blue oval loader with teal ring.
 */
import { Box } from '@mui/material';

export function SplashScreen() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient – dark teal-green fading into black */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, #0d3d38 0%, #062923 40%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Central oval loading indicator – light blue/cyan with teal ring */}
      <Box
        sx={{
          width: 120,
          height: 48,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 100%)',
          boxShadow: [
            `0 0 24px rgba(34, 211, 238, 0.5)`,
            `0 0 48px rgba(13, 148, 136, 0.25)`,
            'inset 0 1px 0 rgba(255,255,255,0.2)',
          ].join(', '),
          border: '2px solid rgba(13, 148, 136, 0.6)',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.85, transform: 'scale(1.02)' },
          },
        }}
      />
    </Box>
  );
}

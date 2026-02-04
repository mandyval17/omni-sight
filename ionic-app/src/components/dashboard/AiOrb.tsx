import { Box } from '@mui/material';

type AiOrbProps = {
  variant?: 'default' | 'searching';
  size?: number;
};

/**
 * AI Orb component from Figma (node 2186:1005)
 * Uses the provided orb image asset
 */
export function AiOrb({ variant = 'default', size = 297 }: AiOrbProps) {
  const isSearching = variant === 'searching';
  const displaySize = isSearching ? size * 0.7 : size;

  return (
    <Box
      sx={{
        position: 'relative',
        width: displaySize,
        height: displaySize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isSearching && {
          animation: 'omnisight-orb-loading 0.9s ease-in-out infinite',
        }),
      }}
    >
      {/* Glow effect behind the orb */}
      <Box
        sx={{
          position: 'absolute',
          width: '130%',
          height: '130%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52, 207, 237, 0.2) 0%, rgba(52, 207, 237, 0.08) 40%, transparent 65%)',
          filter: 'blur(30px)',
          ...(isSearching
            ? { animation: 'omnisight-orb-loading-glow 1.2s ease-in-out infinite' }
            : { animation: 'omnisight-ring-glow 3s ease-in-out infinite' }),
        }}
      />
      {/* The orb image - try both possible locations */}
      <Box
        component="img"
        src="/aiOrbGif.png"
        alt="AI Orb"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          // Fallback to figma-exported asset if aiOrbGif.png not found
          e.currentTarget.src = '/figma-assets/c57a250e42c7249dca2b12e88f1067a312e4eba9.png';
        }}
        sx={{
          width: displaySize,
          height: displaySize,
          objectFit: 'contain',
          position: 'relative',
          zIndex: 1,
          ...(isSearching
            ? {}
            : { animation: 'omnisight-orb-pulse 3s ease-in-out infinite' }),
        }}
      />
    </Box>
  );
}

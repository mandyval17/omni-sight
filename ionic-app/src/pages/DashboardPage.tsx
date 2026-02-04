import { AiOrb } from '@/components/dashboard/AiOrb';
import { AiResponseMessage } from '@/components/dashboard/AiResponseMessage';
import { AnalysisSection } from '@/components/dashboard/AnalysisSection';
import { ChatInput } from '@/components/dashboard/ChatInput';
import { FeatureCards } from '@/components/dashboard/FeatureCards';
import { SuggestedQuestions } from '@/components/dashboard/SuggestedQuestions';
import { TrafficChart } from '@/components/dashboard/TrafficChart';
import { UserQueryBubble } from '@/components/dashboard/UserQueryBubble';
import { BottomNav } from '@/components/layout/BottomNav';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { colors, typography } from '@/theme/theme';
import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

type View = 'home' | 'searching' | 'result';

/**
 * Dashboard page from Figma
 * All screens constrained to max 430px width (iPhone frame)
 */
export function DashboardPage() {
  const [view, setView] = useState<View>('home');
  const [searchFocused, setSearchFocused] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearchFocus = useCallback(() => setSearchFocused(true), []);
  const handleSearchBlur = useCallback(() => {
    setTimeout(() => setSearchFocused(false), 150);
  }, []);

  const handleSubmit = useCallback((value: string) => {
    setQuery(value);
    setView('searching');
    setSearchFocused(false);
    setTimeout(() => {
      setView('result');
    }, 2800);
  }, []);

  const handleSelectSuggestion = useCallback((question: string) => {
    handleSubmit(question);
  }, [handleSubmit]);

  /* ---------- SEARCHING ---------- */
  if (view === 'searching') {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#070707',
          overflow: 'hidden',
        }}
      >
        {/* Teal gradient */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(4, 67, 91, 0.5) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <Box sx={{ flexShrink: 0, pt: 'env(safe-area-inset-top)', position: 'relative', zIndex: 1 }}>
          <DashboardHeader />
        </Box>

        {/* Center - Orb + Thinking */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <AiOrb variant="searching" size={135} />
          <Typography
            sx={{
              fontFamily: typography.fontFamily.sans,
              fontSize: '14px',
              color: colors.primary,
              mt: 2,
            }}
          >
            Thinking...
          </Typography>
        </Box>

        {/* Bottom */}
        <Box sx={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <Box sx={{ px: 3, pb: 2, maxWidth: 430, mx: 'auto', width: '100%', boxSizing: 'border-box' }}>
            <ChatInput disabled placeholder="Thinking..." focused />
          </Box>
          <BottomNav />
        </Box>
      </Box>
    );
  }

  /* ---------- RESULT ---------- */
  if (view === 'result') {
    const analysisText = `Here's an in-depth analysis of recent consumer behavior, specifically focusing on major sales events like 'Nova Days' and seasonal trends such as 'Summer Blowout'. Our platform employs sophisticated algorithms to identify emerging patterns and provide actionable insights.

We've observed a significant surge in mobile transactions during evening hours, particularly among younger demographics. This suggests an opportunity to target these users with personalized promotions.

Our system spotted a 20% increase in mobile shopping during weekends.`;

    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#070707',
          overflow: 'hidden',
        }}
      >
        {/* Teal gradient */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(4, 67, 91, 0.4) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <Box sx={{ flexShrink: 0, pt: 'env(safe-area-inset-top)', position: 'relative', zIndex: 1 }}>
          <DashboardHeader />
        </Box>

        {/* Scrollable content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              maxWidth: 430,
              mx: 'auto',
              width: '100%',
              px: 3,
              pt: 2,
              pb: 4,
              boxSizing: 'border-box',
            }}
          >
            <UserQueryBubble query={query} />
            <AiResponseMessage message="Certainly! Here's an analysis of recent consumer shopping timings, categorized by specific occasions and events." />
            <TrafficChart />
            <AnalysisSection content={analysisText} />
          </Box>
        </Box>

        {/* Bottom */}
        <Box sx={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <Box sx={{ px: 3, pb: 2, maxWidth: 430, mx: 'auto', width: '100%', boxSizing: 'border-box' }}>
            <ChatInput onSubmit={handleSubmit} />
          </Box>
          <BottomNav />
        </Box>
      </Box>
    );
  }

  /* ---------- HOME ---------- */
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#070707',
        overflow: 'hidden',
      }}
    >
      {/* Teal gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(4, 67, 91, 0.6) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <Box sx={{ flexShrink: 0, pt: 'env(safe-area-inset-top)', position: 'relative', zIndex: 1 }}>
        <DashboardHeader />
      </Box>

      {/* Main scrollable content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            maxWidth: 430,
            mx: 'auto',
            width: '100%',
            px: 3,
            pt: 2,
            pb: 2,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Title */}
          <Box sx={{ textAlign: 'center', mb: 3, maxWidth: '100%' }}>
            <Typography
              component="h1"
              sx={{
                fontFamily: typography.fontFamily.sans,
                fontWeight: typography.fontWeight.medium,
                fontSize: 'clamp(28px, 8vw, 36px)',
                lineHeight: 1.1,
                color: colors.text,
                letterSpacing: '-0.02em',
              }}
            >
              Analyse, Visualize,
            </Typography>
            <Typography
              component="span"
              sx={{
                fontFamily: typography.fontFamily.serif,
                fontStyle: 'italic',
                fontWeight: typography.fontWeight.regular,
                fontSize: 'clamp(30px, 9vw, 39px)',
                lineHeight: 1.1,
                color: colors.text,
                letterSpacing: '0.03em',
                display: 'block',
              }}
            >
              Contemplate.
            </Typography>
          </Box>

          {/* AI Orb */}
          <Box sx={{ mb: 2, maxWidth: '100%' }}>
            <AiOrb variant="default" size={Math.min(250, window.innerWidth * 0.6)} />
          </Box>

          {/* Description */}
          <Typography
            sx={{
              fontFamily: typography.fontFamily.sans,
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              maxWidth: 300,
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            Ratna AI can help you discover hidden patterns, predict future trends, and make data-driven decisions.
          </Typography>

          {/* Feature cards */}
          <Box sx={{ width: '100%', mb: 3, overflow: 'hidden' }}>
            <FeatureCards />
          </Box>
        </Box>
      </Box>

      {/* Bottom section */}
      <Box sx={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
        {searchFocused && (
          <Box sx={{ px: 3, mb: 2, maxWidth: 430, mx: 'auto', width: '100%', boxSizing: 'border-box' }}>
            <SuggestedQuestions onSelect={handleSelectSuggestion} />
          </Box>
        )}

        <Box sx={{ px: 3, pb: 2, maxWidth: 430, mx: 'auto', width: '100%', boxSizing: 'border-box' }}>
          <ChatInput
            onSubmit={handleSubmit}
            focused={searchFocused}
            autoFocus={searchFocused}
          />
          {!searchFocused && (
            <Box
              onClick={handleSearchFocus}
              sx={{ position: 'absolute', inset: 0, cursor: 'text' }}
            />
          )}
        </Box>

        <BottomNav />
      </Box>

      {/* Overlay to close suggestions */}
      {searchFocused && (
        <Box onClick={handleSearchBlur} sx={{ position: 'fixed', inset: 0, zIndex: 1 }} />
      )}
    </Box>
  );
}

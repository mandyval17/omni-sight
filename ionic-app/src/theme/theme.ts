/**
 * Omnisight Design System
 * Single source of truth for all design tokens
 * Based on Figma design (node 2186-665)
 */
import { createTheme } from '@mui/material/styles';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

/** Color palette from Figma get_variable_defs */
export const colors = {
  // Primary accent (Colors / Light Blue)
  primary: '#34cfed',
  primaryDark: '#04435b', // Colors / Dark Blue
  primaryGlow: 'rgba(52, 207, 237, 0.4)',

  // Backgrounds
  background: '#070707',
  surface: '#1e1e1e',
  surfaceBorder: 'rgba(255, 255, 255, 0.1)', // Neutrals / White 10%

  // Text (Neutrals / White)
  text: '#ffffff',
  textMuted: 'rgba(255, 255, 255, 0.8)',
  textInactive: 'rgba(255, 255, 255, 0.4)',

  // Overlays
  overlay: 'rgba(255, 255, 255, 0.1)', // Neutrals / White 10%

  // Nav background
  navBg: '#151515',

  // Status
  success: '#22c55e',
  error: '#ef4444',
  warning: '#eab308',
} as const;

/** Spacing scale (px) */
export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Border radius scale (px) */
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
} as const;

/** Typography */
export const typography = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: '"Playfair Display", Georgia, serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '15px',
    lg: '16px',
    xl: '17px',
    '2xl': '24px',
    '3xl': '28px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

/** Component-specific dimensions from Figma */
export const components = {
  header: {
    height: 56,
    paddingX: 24,
    menuButtonSize: 46,
  },
  nav: {
    height: 89,
    iconSize: 24,
    paddingX: 48,
  },
  card: {
    width: 188,
    height: 74,
    radius: 16,
    padding: 16,
    iconSize: 42,
    iconRadius: 10,
    gap: 10,
  },
  input: {
    height: 66,
    radius: 33,
    paddingX: 24,
    sendButtonSize: 50,
  },
  orb: {
    size: 200,
  },
} as const;

// =============================================================================
// MUI THEME (for MUI components only)
// =============================================================================

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      contrastText: colors.background,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
    },
    success: { main: colors.success },
    error: { main: colors.error },
    warning: { main: colors.warning },
  },
  typography: {
    fontFamily: typography.fontFamily.sans,
    button: { textTransform: 'none', fontWeight: typography.fontWeight.semibold },
  },
  shape: { borderRadius: radius.md },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
          color: colors.text,
        },
      },
    },
  },
});

// =============================================================================
// IONIC CSS VARIABLES (inject via style tag or CSS)
// =============================================================================

export const ionicCssVars = `
  :root {
    --ion-background-color: ${colors.background};
    --ion-text-color: ${colors.text};
    --ion-font-family: ${typography.fontFamily.sans};
    --ion-color-primary: ${colors.primary};
    --ion-color-primary-rgb: 52, 207, 237;
    --ion-toolbar-background: transparent;
    --ion-item-background: transparent;
  }
`;

// =============================================================================
// GRADIENT
// =============================================================================

export const gradient = {
  /** Main dashboard background from Figma */
  dashboard: '#070707',
  /** Teal glow overlay at top - simulates Figma ellipses */
  tealGlow: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(4, 67, 91, 0.6) 0%, transparent 70%)',
  /** Bottom blur overlay */
  bottomBlur: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
};

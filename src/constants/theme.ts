// Dark theme color palette for Sony Bravia Remote
export const colors = {
  // Backgrounds
  background: '#0A0A0A',
  surface: '#1A1A1A',
  surfaceLight: '#2A2A2A',

  // Accent colors
  primary: '#E50914', // Sony red
  primaryDark: '#B30710',

  // Text
  text: '#FFFFFF',
  textSecondary: '#888888',
  textMuted: '#555555',

  // Button states
  buttonDefault: '#2A2A2A',
  buttonPressed: '#3A3A3A',
  buttonDisabled: '#1A1A1A',

  // Status
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
} as const;

// Spacing scale (4px base)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Border radius
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

// Font sizes
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

// Button sizes
export const buttonSize = {
  small: 48,
  medium: 56,
  large: 64,
  dpad: 60,
  dpadCenter: 56,
} as const;

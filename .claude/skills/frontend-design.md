# Frontend Design Skill - Sony Bravia Remote

## Design Principles
1. **Minimal** - Only show what's needed
2. **Accessible** - Large touch targets, good contrast
3. **Fast** - Instant feedback on button press
4. **Dark** - Easy on eyes, battery efficient on OLED

## Color Palette

### Dark Theme
```ts
export const colors = {
  // Backgrounds
  background: '#0A0A0A',      // Main app background
  surface: '#1A1A1A',         // Cards, elevated surfaces
  surfaceLight: '#2A2A2A',    // Hover/pressed states

  // Accent
  primary: '#E50914',         // Sony red - power, important actions
  primaryDark: '#B50710',     // Pressed state

  // Text
  textPrimary: '#FFFFFF',     // Primary text
  textSecondary: '#A0A0A0',   // Secondary/muted text
  textDisabled: '#505050',    // Disabled state

  // Semantic
  success: '#4CAF50',         // Connected state
  warning: '#FF9800',         // Warnings
  error: '#F44336',           // Errors, disconnect

  // Buttons
  buttonBg: '#2A2A2A',        // Default button background
  buttonBgPressed: '#3A3A3A', // Pressed state
  buttonBorder: '#3A3A3A',    // Subtle border
};
```

## Spacing System
```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

## Typography
```ts
export const typography = {
  // Font sizes
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,

  // Font weights
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};
```

## Button Design

### Remote Button (Default)
- Background: `buttonBg` (#2A2A2A)
- Border: 1px `buttonBorder`
- Border radius: 12px
- Min size: 56x56 (touch target)
- Text/Icon: `textPrimary`

### Remote Button (Pressed)
- Background: `buttonBgPressed` (#3A3A3A)
- Scale: 0.95 (subtle press animation)

### Power Button
- Background: `primary` (Sony red)
- Icon: White power icon
- Shape: Circular, 64x64

### D-Pad
- Circular container with embedded buttons
- Center OK button highlighted
- Directional buttons as segments

## Layout Patterns

### Main Remote Screen
```
┌─────────────────────────┐
│  [Status: Connected]    │  <- Top status bar
├─────────────────────────┤
│                         │
│      ⏻ (Power)          │  <- Power button (centered)
│                         │
├─────────────────────────┤
│                         │
│         ▲               │
│      ◄ OK ►             │  <- D-Pad (center of screen)
│         ▼               │
│                         │
├─────────────────────────┤
│   🔇    ─●────    🔊    │  <- Volume (with mute)
├─────────────────────────┤
│                         │
│   ↩️ Back    🏠 Home    │  <- Navigation buttons
│                         │
├─────────────────────────┤
│        ••• More         │  <- More button (opens modal)
└─────────────────────────┘
```

### More Menu (Modal)
- Bottom sheet style
- Slide up animation
- Grouped sections:
  1. Media Controls (Play/Pause/Stop)
  2. Number Pad (0-9)
  3. Input Selection
  4. App Shortcuts

## Icons
- Use simple line icons
- Consistent stroke width (2px)
- Size: 24x24 default, 32x32 for primary actions
- Color inherits from parent

## Animations
- Keep animations subtle and fast (150-200ms)
- Use native driver when possible
- Button press: scale(0.95)
- Modal: slide up with fade
- Avoid distracting animations

## Accessibility
- Minimum touch target: 44x44 (iOS) / 48x48 (Android)
- Color contrast ratio: 4.5:1 minimum
- Support dynamic text sizing
- Meaningful labels for screen readers

## Responsive Design
- Design for iPhone SE (smallest) to iPad
- Use percentage-based layouts where possible
- D-pad and buttons scale proportionally
- Test on both small and large screens

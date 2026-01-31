# Sony Bravia Remote - Project Overview

## Project Description
A minimal React Native (Expo) app to control Sony Bravia TVs over local network.

## Key Features
1. **Network Scanner** - Auto-discover Sony TVs on local network
2. **Remote Control** - Essential buttons for daily TV control
3. **Persistent Settings** - Save TV IP for quick reconnection
4. **Dark Theme** - Battery efficient, easy on eyes

## User Requirements
- Simple, minimal interface
- Essential buttons visible, extras in menu
- Dark theme with flat design
- Single TV support
- No haptic feedback
- Run via Expo Go (no App Store)

## Tech Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Expo (managed) | Simple setup, Expo Go support |
| Navigation | Expo Router | File-based, modern approach |
| Language | TypeScript | Type safety, better DX |
| State | Context + AsyncStorage | Simple app, no Redux needed |
| Styling | StyleSheet | Native performance |
| Icons | @expo/vector-icons | Bundled with Expo |

## Essential Buttons (Main Screen)
- Power (on/off toggle)
- D-Pad (Up, Down, Left, Right, OK)
- Volume Up/Down/Mute
- Back
- Home
- More (opens additional controls)

## Menu Buttons (More Modal)
- Number pad (0-9)
- Input selection (HDMI 1-4)
- Media controls (Play, Pause, Stop)
- Channel Up/Down

## Screen Flow
```
┌─────────────┐     ┌─────────────┐
│   Setup     │────▶│    Main     │
│   Screen    │     │   Remote    │
└─────────────┘     └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    ▼             ▼
              ┌──────────┐  ┌──────────┐
              │   More   │  │ Settings │
              │   Modal  │  │  Screen  │
              └──────────┘  └──────────┘
```

## File Structure
```
simple-remote-tv/
├── .claude/
│   └── skills/              # Claude Code skills
├── src/
│   ├── app/                 # Expo Router screens
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # Main remote
│   │   ├── setup.tsx        # First-time setup
│   │   └── settings.tsx     # Settings
│   ├── components/
│   │   ├── DPad.tsx
│   │   ├── PowerButton.tsx
│   │   ├── VolumeControl.tsx
│   │   ├── RemoteButton.tsx
│   │   └── MoreModal.tsx
│   ├── hooks/
│   │   ├── useTv.ts         # TV connection hook
│   │   └── useStorage.ts    # AsyncStorage hook
│   ├── services/
│   │   └── bravia.ts        # Sony Bravia API
│   ├── constants/
│   │   ├── theme.ts         # Colors, spacing
│   │   └── ircc.ts          # IR command codes
│   ├── context/
│   │   └── TvContext.tsx    # App-wide TV state
│   └── types/
│       └── index.ts         # TypeScript types
├── assets/                  # Images, icons
├── app.json                 # Expo config
├── package.json
└── tsconfig.json
```

## Development Workflow
1. Run `npx expo start` to start dev server
2. Scan QR code with Expo Go on iPhone
3. App reloads automatically on save

## Testing Checklist
- [ ] TV discovery works on local network
- [ ] All remote buttons send correct commands
- [ ] Settings persist after app restart
- [ ] Error handling when TV unreachable
- [ ] UI looks good on different screen sizes

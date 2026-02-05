# React Native + Expo Skill

## Project Setup
- Use Expo managed workflow (not bare)
- Use Expo Router for file-based navigation
- Use TypeScript with strict mode enabled
- Target Expo SDK 50+

## File Structure
```
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Main remote screen
│   ├── setup.tsx           # First-time setup
│   └── settings.tsx        # Settings page
├── components/             # Reusable UI components
│   ├── buttons/            # Button components
│   ├── layout/             # Layout components
│   └── modals/             # Modal components
├── hooks/                  # Custom React hooks
├── services/               # API and business logic
├── constants/              # App constants, themes
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## Coding Standards

### Components
- Use functional components only (no class components)
- One component per file
- Use named exports for components
- Props interface defined above component
- Destructure props in function signature

```tsx
// Good
interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ label, onPress, disabled = false }: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Text>{label}</Text>
    </Pressable>
  );
}
```

### Hooks
- Prefix custom hooks with `use`
- Keep hooks focused on single responsibility
- Return object for multiple values (not array)

```tsx
// Good
export function useTvConnection() {
  return { isConnected, connect, disconnect, error };
}
```

### Styling
- Use StyleSheet.create() for all styles
- Styles defined at bottom of component file
- Use constants for colors, spacing, sizes
- Prefer flexbox for layouts

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
});
```

### State Management
- Use useState for local component state
- Use useContext for shared app state (TV connection, settings)
- Use AsyncStorage for persistence
- No Redux needed for this simple app

### Imports Order
1. React/React Native imports
2. Expo imports
3. Third-party libraries
4. Local components
5. Local hooks/services
6. Types
7. Constants/utils

## Expo-Specific Patterns

### Navigation (Expo Router)
- Use file-based routing in `app/` directory
- Use `<Stack>` for stack navigation
- Use `<Link>` for navigation between screens
- Use `useRouter()` for programmatic navigation

### Assets
- Store images in `assets/` folder
- Use `require()` for local images
- Optimize images for mobile

### Permissions
- Request only necessary permissions
- Handle permission denial gracefully
- Use expo-network for network features

## Performance
- Memoize expensive computations with useMemo
- Memoize callbacks with useCallback when passed to child components
- Use React.memo for pure components that render often
- Avoid inline styles and functions in render

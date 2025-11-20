# Mobile App Module

This folder contains all mobile-specific code for the Ionic Framework and Capacitor integration. This separation makes it easier to maintain both web and mobile versions of the app.

## Folder Structure

```
src/mobile/
├── components/          # Mobile-specific React components
│   ├── IonicApp.tsx     # Main Ionic app wrapper
│   └── MobileNavigation.tsx  # Mobile navigation component
├── hooks/               # Mobile-specific React hooks
│   ├── usePlatform.ts   # Platform detection hook
│   ├── useHaptics.ts    # Haptic feedback hook
│   └── useKeyboard.ts   # Keyboard handling hook
├── lib/                 # Mobile utilities and helpers
│   └── platform.ts      # Platform detection utilities
├── styles/              # Mobile-specific styles
│   └── mobile.css       # Mobile CSS and Ionic theme variables
├── index.ts             # Centralized exports
└── README.md            # This file
```

## Usage

### Importing Mobile Features

All mobile features can be imported from the main mobile module:

```typescript
// Import components
import { IonicApp, MobileNavigation } from "@/mobile";

// Import hooks
import { usePlatform, useHaptics, useKeyboard } from "@/mobile";

// Import platform utilities
import { getPlatform, isNativePlatform } from "@/mobile";
```

### Using Platform Detection

```typescript
import { usePlatform } from "@/mobile";

function MyComponent() {
  const { isNative, isIOS, isAndroid, isWeb } = usePlatform();

  if (isNative) {
    // Native-specific code
  }

  return <div>...</div>;
}
```

### Using Haptic Feedback

```typescript
import { useHaptics } from "@/mobile";

function MyButton() {
  const { impact } = useHaptics();

  const handleClick = () => {
    impact(); // Triggers haptic feedback on native
    // ... rest of click handler
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Using Keyboard Handling

```typescript
import { useKeyboard } from "@/mobile";

function MyForm() {
  const { isVisible, keyboardHeight } = useKeyboard();

  return (
    <div style={{ paddingBottom: isVisible ? keyboardHeight : 0 }}>
      {/* Form content */}
    </div>
  );
}
```

## Components

### IonicApp

The main wrapper component that:

- Initializes Ionic React
- Sets up Status Bar
- Handles Splash Screen
- Manages Android back button
- Handles deep linking
- Wraps app with `IonApp` on native platforms

### MobileNavigation

Mobile-specific navigation component that can be enhanced with Ionic components like `IonTabs` or `IonMenu`.

## Hooks

### usePlatform

Returns platform information:

- `platform`: "ios" | "android" | "web"
- `isNative`: boolean
- `isIOS`: boolean
- `isAndroid`: boolean
- `isWeb`: boolean
- `isMobile`: boolean

### useHaptics

Provides haptic feedback functions:

- `impact(style?)`: Trigger impact haptic
- `notification(type?)`: Trigger notification haptic
- `selectionStart()`: Start selection haptic
- `selectionChanged()`: Change selection haptic
- `selectionEnd()`: End selection haptic
- `vibrate()`: Simple vibration

### useKeyboard

Returns keyboard state:

- `isVisible`: boolean
- `keyboardHeight`: number

## Platform Utilities

Located in `lib/platform.ts`:

- `getPlatform()`: Get current platform
- `getPlatformInfo()`: Get full platform info
- `isPlatform(platform)`: Check specific platform
- `isNativePlatform()`: Check if native
- `isMobilePlatform()`: Check if mobile
- `getPlatformClasses()`: Get CSS classes for platform

## Styles

The `styles/mobile.css` file contains:

- Ionic CSS variables (theme customization)
- Safe area insets for notched devices
- Touch target optimizations
- Mobile-specific CSS rules

## Adding New Mobile Features

When adding new mobile-specific features:

1. **Components**: Add to `components/` folder
2. **Hooks**: Add to `hooks/` folder
3. **Utilities**: Add to `lib/` folder
4. **Styles**: Add to `styles/` folder
5. **Exports**: Add to `index.ts` for easy importing

## Best Practices

1. **Keep mobile code separate**: Don't mix mobile and web code
2. **Use platform detection**: Always check platform before using native features
3. **Graceful degradation**: Mobile features should fail silently on web
4. **Import from index**: Use `@/mobile` imports for consistency
5. **Document new features**: Update this README when adding features

## Integration with Web

The mobile module is designed to work alongside the web codebase:

- Web code remains unchanged
- Mobile features are additive
- Platform detection ensures proper behavior
- No breaking changes to existing web functionality

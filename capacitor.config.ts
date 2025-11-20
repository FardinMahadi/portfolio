import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fardinmahadi.portfolio",
  appName: "FardinMahadi Portfolio",
  webDir: "out", // Next.js static export output directory
  server: {
    androidScheme: "https",
    iosScheme: "https",
    // For development, you can uncomment and set to your dev server URL
    // url: 'http://localhost:3000',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#06b6d4",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#06b6d4",
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true,
    },
  },
};

export default config;

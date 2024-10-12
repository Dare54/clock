import { NavigationContainer } from "@react-navigation/native"; // Provides the navigation container for the app
import { createStackNavigator } from "@react-navigation/stack"; // Creates a stack navigator for managing screen transitions
import { useFonts } from "expo-font"; // Loads custom fonts via Expo
import { Provider } from "react-redux"; // Integrates Redux for state management
import { FrederickatheGreat_400Regular as FrederickaRegular } from "@expo-google-fonts/fredericka-the-great"; // Custom font: Fredericka the Great
import { NanumBrushScript_400Regular as NanumRegular } from "@expo-google-fonts/nanum-brush-script"; // Custom font: Nanum Brush Script
import { Play_700Bold as PlayBold } from "@expo-google-fonts/play"; // Custom font: Play Bold
import { ShareTechMono_400Regular as ShareTechRegular } from "@expo-google-fonts/share-tech-mono"; // Custom font: Share Tech Mono
import { SpecialElite_400Regular as SpecialRegular } from "@expo-google-fonts/special-elite"; // Custom font: Special Elite
import { SafeAreaProvider } from "react-native-safe-area-context"; // Manages the safe area for iOS/Android, preventing UI overlap with device boundaries
import { useEffect, useState } from "react"; // React hooks for managing component lifecycle and state

// Importing custom components and hooks
import { Loading } from "./src/components"; // Loading component to display while app is loading
import {
  useShowBattery, // Hook to control showing battery information
  useShowDate, // Hook to control showing date
  useShowSeconds, // Hook to control showing seconds
  useTimeColor, // Hook to control the color of the time display
  useTimeFont, // Hook to control the font of the time display
  useTimeFormat // Hook to control the time format (12-hour vs 24-hour)
} from "./src/Hooks";
import {
  HomeScreen // Main home screen
} from "./src/screens/HomeScreen";
import { getConfig } from "./src/utils/cache"; // Utility function to fetch cached config settings
import store from "./src/store"; // Redux store for global state management

import "./src/i18n"; // Importing the internationalization setup (i18n)

// Main App component
export default function App() {
  return (
    // Wrapping the app in Redux Provider for global state management
    <Provider store={store}>
      {/* Ensures app is displayed within safe boundaries on all devices */}
      <SafeAreaProvider style={{ flex: 1 }}>
        {/* Main component is rendered here */}
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
}

// Creating a Stack Navigator instance for managing navigation between screens
const Stack = createStackNavigator();

// Main component handling font loading and app configuration
const Main = () => {
  // Loading custom fonts using Expo's useFonts hook
  const [fontsLoaded] = useFonts({
    FrederickaRegular,
    NanumRegular,
    ShareTechRegular,
    SpecialRegular,
    PlayBold
  });

  // State for tracking if configuration is loading
  const [configLoading, setConfigLoading] = useState(false);

  // Using custom hooks to set various settings from the configuration
  const { setTimeColor } = useTimeColor(); // Sets the time color
  const { setTimeFont } = useTimeFont(); // Sets the font for displaying time
  const { setTimeFormat } = useTimeFormat(); // Sets the time format (12-hour/24-hour)
  const { setShowSeconds } = useShowSeconds(); // Sets whether to show seconds in the time display
  const { setShowDate } = useShowDate(); // Sets whether to show the date
  const { setShowBattery } = useShowBattery(); // Sets whether to show battery status

  // useEffect hook to run once after the component is mounted
  useEffect(() => {
    // Set config loading state to true while the config is being fetched
    setConfigLoading(true);

    // Fetch the config from the cache or other storage
    getConfig()
      .then((config) => {
        // Apply the configuration settings to the hooks
        setTimeColor(config.timeColor); // Apply time color setting
        setTimeFont(config.timeFont); // Apply time font setting
        setTimeFormat(config.timeFormat); // Apply time format setting
        setShowSeconds(config.showSeconds); // Apply seconds display setting
        setShowDate(config.showDate); // Apply date display setting
        setShowBattery(config.showBattery); // Apply battery display setting
      })
      .finally(() => {
        // Once the config is applied, set loading to false
        setConfigLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // If the fonts haven't loaded yet or the configuration is still loading, show a loading screen
  if (!fontsLoaded || configLoading) {
    return <Loading />; // Render the Loading component while waiting for fonts or config
  }

  // Once fonts and configuration are loaded, return the main app content
  return (
    <NavigationContainer>
      {/* Stack Navigator for screen transitions */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Define the screens in the stack */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        {/* Main home screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

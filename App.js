import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { FrederickatheGreat_400Regular as FrederickaRegular } from "@expo-google-fonts/fredericka-the-great";
import { NanumBrushScript_400Regular as NanumRegular } from "@expo-google-fonts/nanum-brush-script";
import { Play_700Bold as PlayBold } from "@expo-google-fonts/play";
import { ShareTechMono_400Regular as ShareTechRegular } from "@expo-google-fonts/share-tech-mono";
import { SpecialElite_400Regular as SpecialRegular } from "@expo-google-fonts/special-elite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import { Loading } from "./src/components";
import {
  useShowBattery,
  useShowDate,
  useShowSeconds,
  useTimeColor,
  useTimeFont,
  useTimeFormat
} from "./src/Hooks";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { FontsScreen } from "./src/screens/FontsScreen";
import { getConfig } from "./src/utils/cache";
import store from "./src/store";

import "./src/i18n";

export default function App() {
  return (
    <Provider store={store}>
      {/* Ensures app is displayed within safe boundaries on all devices */}
      <SafeAreaProvider style={{ flex: 1 }}>
        {/* Main component is rendered here */}
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
}

const Stack = createStackNavigator();

const Main = () => {
  const [fontsLoaded] = useFonts({
    FrederickaRegular,
    NanumRegular,
    ShareTechRegular,
    SpecialRegular,
    PlayBold
  });

  const [configLoading, setConfigLoading] = useState(false);

  const { setTimeColor } = useTimeColor();
  const { setTimeFont } = useTimeFont();
  const { setTimeFormat } = useTimeFormat();
  const { setShowSeconds } = useShowSeconds();
  const { setShowDate } = useShowDate();
  const { setShowBattery } = useShowBattery();

  useEffect(() => {
    setConfigLoading(true);

    getConfig()
      .then((config) => {
        setTimeColor(config.timeColor);
        setTimeFont(config.timeFont);
        setTimeFormat(config.timeFormat);
        setShowSeconds(config.showSeconds);
        setShowDate(config.showDate);
        setShowBattery(config.showBattery);
      })
      .finally(() => {
        setConfigLoading(false);
      });
  }, []);

  if (!fontsLoaded || configLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="FontsScreen" component={FontsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

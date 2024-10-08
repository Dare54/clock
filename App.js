import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FrederickatheGreat_400Regular,
  useFonts
} from "@expo-google-fonts/fredericka-the-great";
import { NanumBrushScript_400Regular } from "@expo-google-fonts/nanum-brush-script";
import { Play_400Regular } from "@expo-google-fonts/play";
import { ShareTechMono_400Regular } from "@expo-google-fonts/share-tech-mono";
import { SpecialElite_400Regular } from "@expo-google-fonts/special-elite";

import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import store from "./src/store";

const Stack = createStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    FrederickatheGreat_400Regular,
    NanumBrushScript_400Regular,
    Play_400Regular,
    ShareTechMono_400Regular,
    SpecialElite_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export const Increase = () => ({
  type: "INCREASE"
});

export const Decrease = () => ({
  type: "DECREASE"
});

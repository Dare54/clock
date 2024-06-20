import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  frederickatheGreat_400Regular

} from "@expo-google-fonts/fredericka-the-great";
import { nanumBrushScript_400Regular } from "@expo-google-fonts/nanum-brush-script";
import { play_400Regular } from "@expo-google-fonts/play";
import { shareTechMono_400Regular } from "@expo-google-fonts/share-tech-mono";
import { specialElite_400Regular } from "@expo-google-fonts/special-elite";

import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import { View } from "react-native";


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  
  let [fontsLoaded, fontError] = useFonts({
    frederickatheGreat_400Regular,
    nanumBrushScript_400Regular,
    play_400Regular,
    shareTechMono_400Regular,
    specialElite_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export const Increase = () => ({
  type: 'INCREASE'
})

export const Decrease = () => ({
  type: 'DECREASE'
})

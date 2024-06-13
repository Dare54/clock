import "react-native-gesture-handler";
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
    FrederickatheGreat_400Regular,
    NanumBrushScript_400Regular,
    Play_400Regular,
    ShareTechMono_400Regular,
    SpecialElite_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

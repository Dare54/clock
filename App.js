import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { useFonts, FrederickatheGreat_400Regular, } from '@expo-google-fonts/fredericka-the-great';
import { NanumBrushScript_400Regular } from '@expo-google-fonts/nanum-brush-script';
import { Play_400Regular } from '@expo-google-fonts/play';
import { ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
import { SpecialElite_400Regular } from '@expo-google-fonts/special-elite';


export default function App() {
  let [fontsLoaded] = useFonts({
    FrederickatheGreat_400Regular, NanumBrushScript_400Regular, Play_400Regular, ShareTechMono_400Regular, SpecialElite_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'FrederickatheGreat_400Regular', fontSize: 40 }}>FrederickatheGreat</Text>
      <Text style={{ fontFamily: 'NanumBrushScript_400Regular', fontSize: 40 }}>NanumBrushScrip</Text>
      <Text style={{ fontFamily: 'Play', fontSize: 40 }}>play</Text>
      <Text style={{ fontFamily: 'ShareTechMono_400Regular', fontSize: 40 }}>ShareTechMono</Text>
      <Text style={{ fontFamily: 'SpecialElite_400Regular', fontSize: 40 }}>SpecialElite</Text>
    </View>
  );
}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
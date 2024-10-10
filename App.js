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

import { HomeScreen } from "./src/screens/HomeScreen";
import store from "./src/store";

const Stack = createStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
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

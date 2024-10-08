import { Button, View } from "react-native";

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default SettingsScreen;

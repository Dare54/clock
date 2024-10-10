import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { PALETTE } from "../constants";

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: PALETTE.black,
    flex: 1,
    justifyContent: "space-evenly"
  }
});

//main screen
export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden />
    </SafeAreaView>
  );
};

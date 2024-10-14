import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { PALETTE } from "../constants";
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: PALETTE.black,
    flex: 1,
    justifyContent: "center"
  }
});

const Loading = () => (
  <View style={styles.root}>
    {/* Displaying a large, white spinner to indicate loading */}
    <ActivityIndicator size="large" color="white" />

    {/* Setting the status bar text color to light to match the dark background */}
    <StatusBar style="light" />
  </View>
);

export default Loading;

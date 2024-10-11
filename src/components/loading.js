import { ActivityIndicator, StyleSheet, View } from "react-native"; // Provides a spinner (ActivityIndicator) and View for layout
import { StatusBar } from "expo-status-bar"; // Manages the status bar appearance in the app

// Importing the color palette constant
import { PALETTE } from "../constants"; // A constant containing color definitions

// Defining the styles for the Loading component using React Native's StyleSheet
const styles = StyleSheet.create({
  root: {
    alignItems: "center", // Centers child components horizontally
    backgroundColor: PALETTE.black, // Sets the background color to black (from the palette)
    flex: 1, // Makes the container take up the full screen
    justifyContent: "center" // Centers child components vertically
  }
});

// Loading component definition
const Loading = () => (
  <View style={styles.root}>
    {/* Displaying a large, white spinner to indicate loading */}
    <ActivityIndicator size="large" color="white" />

    {/* Setting the status bar text color to light to match the dark background */}
    <StatusBar style="light" />
  </View>
);

export default Loading; // Exporting the component to be used in other parts of the app

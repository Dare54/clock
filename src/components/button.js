import { Pressable, StyleSheet } from "react-native";

import { COLORS, GAP } from "../constants";
import Text from "./text";

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    borderColor: COLORS.base,
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 4 * GAP,
    paddingVertical: 2 * GAP
  }
});

// Button component: This renders a button with a label.
// It takes 'label' and 'onPress' as props.
const Button = ({ label, onPress }) => {
  return (
    // Pressable component is a touchable area that listens for press events.
    // 'onPress' is triggered when the button is pressed.
    <Pressable
      onPress={onPress}
      // The 'style' prop is used to dynamically change the button's style.
      // The 'pressed' parameter from Pressable indicates if the button is being pressed.
      // If pressed, the button's opacity is set to 0.7, otherwise it's 1 (fully opaque).
      style={({ pressed }) => ({
        ...styles.root, // Merges base styles from 'styles.root'.
        opacity: pressed ? 0.7 : 1 // Adjusts opacity based on pressed state.
      })}
    >
      {/* Displays the label text inside the button. */}
      <Text>{label}</Text>
    </Pressable>
  );
};

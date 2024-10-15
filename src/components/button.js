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

const Button = ({ label, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        ...styles.root,
        opacity: pressed ? 0.7 : 1
      })}
    >
      {/* Displays the label text inside the button. */}
      <Text>{label}</Text>
    </Pressable>
  );
};

export default Button;

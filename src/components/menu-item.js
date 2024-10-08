import { Pressable, StyleSheet } from "react-native";

import { GAP, PALETTE } from "../constants";
import Text from "./text";

/**
 * @param {object} params
 * @param {string} params.label
 * @param {() => void} params.onPress
 */

const styles = StyleSheet.create({
  text: {
    color: PALETTE.black,
    paddingHorizontal: 6 * GAP,
    paddingVertical: 2.5 * GAP
  }
});
const MenuItem = ({ label, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export default MenuItem;

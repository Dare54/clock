import { Pressable, StyleSheet } from "react-native";

import { GAP } from "../constants";

const styles = StyleSheet.create({
  root: {
    padding: 1.5 * GAP
  }
});
const IconButton = ({ icon, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.root,
        opacity: pressed ? 0.7 : 1
      })}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
};

export default IconButton;

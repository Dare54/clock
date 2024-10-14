import { Pressable, StyleSheet } from "react-native";

import CheckOffIcon from "../../assets/images/check-off-icon.svg";
import CheckOnIcon from "../../assets/images/check-on-icon.svg";
import { COLORS, GAP } from "../constants";
import Text from "./text";

/**
 * @param {object} params
 * @param {string} params.label
 * @param {boolean} params.value
 * @param {(value: boolean) => void} params.onChange
 */

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: GAP,
    padding: GAP
  },
  label: {
    marginLeft: 1.5 * GAP
  }
});

const CheckboxField = ({ label, value, onChange }) => {
  return (
    <Pressable onPress={() => onChange((value = !value))} style={styles.root}>
      {/* Check if the 'value' is true (checked state).
      If true, render the CheckOnIcon; otherwise, render the CheckOffIcon. */}
      {value ? (
        <CheckOnIcon width={28} height={32} fill={COLORS.base} />
      ) : (
        <CheckOffIcon width={28} height={32} fill={COLORS.base} />
      )}

      {/* Render the label next to the checkbox icon. */}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default CheckboxField;

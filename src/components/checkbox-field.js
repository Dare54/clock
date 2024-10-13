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

// CheckboxField component: This renders a checkbox with a label.
// It takes 'label', 'value', and 'onChange' as props.
const CheckboxField = ({ label, value, onChange }) => {
  return (
    // Pressable component is a touchable area that listens for press events.
    // When pressed, it toggles the checkbox state by inverting the current 'value'.
    <Pressable
      onPress={() => onChange((value = !value))} // Inverts the 'value' when pressed and calls 'onChange'.
      style={styles.root} // Applies base styles to the Pressable area.
    >
      {/* Check if the 'value' is true (checked state).
      If true, render the CheckOnIcon; otherwise, render the CheckOffIcon. */}
      {value ? (
        // Render the CheckOnIcon when the checkbox is checked.
        <CheckOnIcon width={28} height={32} fill={COLORS.base} />
      ) : (
        // Render the CheckOffIcon when the checkbox is unchecked.
        <CheckOffIcon width={28} height={32} fill={COLORS.base} />
      )}

      {/* Render the label next to the checkbox icon. */}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default CheckboxField;

import { Pressable, StyleSheet } from "react-native";
import { useContext, useMemo } from "react";

import { context as GlobalContext } from "../context";
import { COLORS, GAP } from "../constants";
import RadioOffIcon from "../../assets/images/radio-off-icon.svg";
import RadioOnIcon from "../../assets/images/radio-on-icon.svg";
import Text from "./text";

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

// RadioButton component: This renders a radio button with a label.
// It takes 'label' and 'value' as props.
export const RadioButton = ({ label, value }) => {
  // Extracts 'value' and 'onChange' from the global context,
  // which is provided by the RadioField component.
  const { value: contextValue, onChange } = useContext(GlobalContext);

  return (
    // Pressable component is a touchable area that calls the 'onChange' function
    // when pressed. It passes the 'value' of the RadioButton to 'onChange'.
    <Pressable onPress={() => onChange(value)} style={styles.root}>
      {/* Check if the 'value' of this RadioButton is the same as the 'contextValue' 
      from the GlobalContext. If true, render the RadioOnIcon, meaning this 
      button is selected; otherwise, render the RadioOffIcon, indicating it's 
      not selected. */}
      {value === contextValue ? (
        // Render the RadioOnIcon when the current button is selected.
        <RadioOnIcon width={28} height={32} fill={COLORS.base} />
      ) : (
        // Render the RadioOffIcon when the button is not selected.
        <RadioOffIcon width={28} height={32} fill={COLORS.base} />
      )}

      {/* Render the label next to the radio button icon. */}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

// RadioField component: This sets up the context for the radio buttons.
// It takes 'value' and 'onChange' as props, which it passes to its children
// via the GlobalContext provider.
export const RadioField = ({ value, onChange, children }) => {
  // Memoize the context value to avoid unnecessary re-renders.
  // The value and onChange are dependencies, meaning the context will only
  // update when either 'value' or 'onChange' changes.
  const contextValue = useMemo(() => ({ value, onChange }), [value, onChange]);

  return (
    // GlobalContext.Provider: This provides the contextValue (value and onChange)
    // to all of its children (which will likely include RadioButton components).
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

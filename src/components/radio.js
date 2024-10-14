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

export const RadioButton = ({ label, value }) => {
  const { value: contextValue, onChange } = useContext(GlobalContext);

  return (
    <Pressable onPress={() => onChange(value)} style={styles.root}>
      {}
      {value === contextValue ? (
        <RadioOnIcon width={28} height={32} fill={COLORS.base} />
      ) : (
        <RadioOffIcon width={28} height={32} fill={COLORS.base} />
      )}

      {/* Render the label next to the radio button icon. */}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export const RadioField = ({ value, onChange, children }) => {
  const contextValue = useMemo(() => ({ value, onChange }), [value, onChange]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

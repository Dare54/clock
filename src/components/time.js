import { useContext, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";

import { timeContext as TimeContext } from "../context";
import dayjs from "../utils/dayjs";
import TimeDisplay from "./time-display";
import { BORDER_RADIUS, GAP } from "../constants";

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    borderRadius: BORDER_RADIUS,
    borderWidth: 2,
    height: 120,
    marginBottom: 1.5 * GAP,
    padding: GAP
  }
});

/**
 * TimeSelector component
 * @param {object} params - Component props
 * @param {string} params.value - The current time value
 * @param {(value: string) => void} params.onChange - Function to update the time value
 * @param {React.ReactNode} params.children - The children components to be rendered inside the provider
 */
export const TimeSelector = ({ value, onChange, children }) => {
  // Create a memoized context value object with the current time and change handler
  const contextValue = useMemo(() => ({ value, onChange }), [value, onChange]);

  // Provide the context value to the child components using the TimeContext provider
  return (
    <TimeContext.Provider value={contextValue}>{children}</TimeContext.Provider>
  );
};

/**
 * TimeButton component
 * @param {object} params - Component props
 * @param {string} params.value - The current time value associated with this button
 * @param {string} params.color - The color used for the button's border and time display
 * @param {string} params.font - The font used to display the time
 * @param {'am_pm' | '24h'} params.format - Format to display the time (either 'am_pm' or '24h')
 * @param {number} params.showSeconds - Whether to show seconds in the time display (1 = true, 0 = false)
 */
export const TimeButton = ({ value, color, font, format, showSeconds }) => {
  const { value: contextValue, onChange } = useContext(TimeContext);

  const now = useMemo(() => dayjs(), []);

  return (
    <Pressable
      onPress={() => onChange(value)}
      style={({ pressed }) => ({
        ...styles.root,
        borderColor: color,
        opacity:
          value === contextValue ? (pressed ? 0.9 : 1) : pressed ? 0.4 : 0.3
      })}
    >
      <TimeDisplay
        value={now}
        color={color}
        font={font}
        format={format}
        showSeconds={showSeconds}
      />
    </Pressable>
  );
};

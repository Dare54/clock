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
  // Use the TimeContext to get the current selected time and the change handler
  const { value: contextValue, onChange } = useContext(TimeContext);

  // Memoize the current date and time using dayjs utility. This prevents unnecessary re-rendering
  const now = useMemo(() => dayjs(), []);

  // Return a Pressable component (touchable button) that allows interaction
  return (
    <Pressable
      // onPress event calls the onChange handler with the current button's time value
      onPress={() => onChange(value)}
      style={({ pressed }) => ({
        ...styles.root, // Apply the base styles from the StyleSheet
        borderColor: color, // Set the border color dynamically based on the passed color prop
        opacity:
          // Determine the opacity based on whether the button's value is selected or pressed
          // If the value matches the selected time, opacity is higher (indicating selection)
          // If pressed, the opacity is slightly reduced for visual feedback
          value === contextValue ? (pressed ? 0.9 : 1) : pressed ? 0.4 : 0.3
      })}
    >
      {/* Render the TimeDisplay component to show the current time with formatting options */}
      <TimeDisplay
        value={now} // Pass the memoized current time to the display
        color={color} // Pass the color prop for styling the display
        font={font} // Pass the font prop for the display text
        format={format} // Pass the format prop to determine whether to show 'am_pm' or '24h'
        showSeconds={showSeconds} // Pass whether to show seconds in the time display
      />
    </Pressable>
  );
};

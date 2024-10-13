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
 * @param {object} params
 * @param {string} params.value
 * @param {(value: string) => void} params.onChange
 * @param {React.ReactNode} params.children
 */
export const TimeSelector = ({ value, onChange, children }) => {
  const contextValue = useMemo(() => ({ value, onChange }), [value, onChange]);

  return (
    <TimeContext.Provider value={contextValue}>{children}</TimeContext.Provider>
  );
};

/**
 * @param {object} params
 * @param {string} params.value
 * @param {string} params.color
 * @param {'am_pm' | '24h'} params.format
 * @param {number} params.showSeconds
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
          // eslint-disable-next-line no-nested-ternary
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

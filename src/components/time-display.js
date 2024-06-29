import { useEffect, useMemo, useState } from "react";

import { AM_PM } from "../constants";
import { useOrientation } from "../hooks/use-orientation";
import Text from "./text";

/**
 * @param {object} params
 * @param {dayjs.Dayjs} params.value
 * @param {string} params.color
 * @param {'am_pm' | '24h'} params.format
 * @param {boolean} params.showSeconds
 * @param {string} [params.font]
 * @param {object} [params.style]
 */
const TimeDisplay = ({
  value,
  color,
  format,
  showSeconds = false,
  font = "ShareTechRegular",
  style = {}
}) => {
  const [text, setText] = useState("");
  const orientation = useOrientation();
  const textWidth = useMemo(() => {
    return orientation === "portrait" ? 65 : 75;
  }, [orientation]);

  // console.log("width: ", textWidth);

  const timeFormat = useMemo(() => {
    if (format === AM_PM) {
      return showSeconds ? "h:mm:ss a" : "h:mm a";
    }

    return showSeconds ? "HH:mm:ss" : "HH:mm";
  }, [format, showSeconds]);

  useEffect(() => {
    setText(value.format(timeFormat));
  }, [value, timeFormat]);

  return (
    <Text fontSize={textWidth} style={{ ...style, color, fontFamily: font }}>
      {text}
    </Text>
  );
};

export default TimeDisplay;
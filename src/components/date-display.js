import { useEffect, useState } from "react";

import Text from "./text";

/**
 * @param {object} params
 * @param {dayjs.Dayjs} params.value
 * @param {string} params.color
 * @param {object} [params.style]
 */
const DateDisplay = ({ value, color, style = {} }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(value.format("ll"));
  }, [value]);

  return (
    <Text fontSize={20} style={{ ...style, color }}>
      {text}
    </Text>
  );
};

export default DateDisplay;
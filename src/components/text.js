import { Text as RNText, StyleSheet } from "react-native";

import { FONT_COLOR, FONT_SIZE } from "../constants";
import { normalize } from "../utils/normalize";

const styles = StyleSheet.create({
  root: {
    color: FONT_COLOR
  }
});

/**
 * Custom Text component to manage font size, color, and styles.
 * @param {object} params - The props passed to the component
 * @param {ReactNode} params.children - The content to be displayed inside the Text component
 * @param {number} [params.fontSize] - Optional prop to customize font size (default is FONT_SIZE)
 * @param {object} [params.style] - Optional custom styles to be applied to the Text component
 * @returns React Native Text component with custom styling
 */
const Text = ({ fontSize = FONT_SIZE, style = {}, children }) => {
  return (
    <RNText
      numberOfLines={1}
      adjustsFontSizeToFit
      style={{ ...styles.root, ...style, fontSize: normalize(fontSize) }}
    >
      {children}{" "}
      {/* Renders the children (content inside the Text component) */}
    </RNText>
  );
};

export default Text;

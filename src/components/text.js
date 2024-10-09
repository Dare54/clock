import { Text as RNText, StyleSheet } from "react-native";

import { FONT_COLOR, FONT_SIZE } from "../constants";
import { normalize } from "../utils/normalize";

const styles = StyleSheet.create({
  root: {
    color: FONT_COLOR
  }
});

/**
 * @param {object} params
 * @param {ReactNode} params.children
 * @param {number} [params.fontSize]
 * @param {object} [params.style]
 * @returns
 */

const Text = ({ fontSize = FONT_SIZE, style = {}, Children }) => {
  return (
    <RNText
      numberOfLines={1}
      adjustsFontSizeToFit
      style={{ ...styles.root, ...style, fontSize: normalize(fontSize) }}
    >
      {Children}
    </RNText>
  );
};

export default Text;

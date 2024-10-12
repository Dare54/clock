import { StyleSheet } from "react-native"; // Importing the base Text component from React Native

// Importing constants and utility functions
import { FONT_COLOR, FONT_SIZE } from "../constants"; // Constants for default font color and size
import { normalize } from "../utils/normalize"; // A utility function to normalize font size across different screen sizes

// Defining styles for the Text component
const styles = StyleSheet.create({
  root: {
    color: FONT_COLOR // Sets the default text color from the constants
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
    // Render the React Native Text component with custom styles
    <Text
      numberOfLines={1} // Limits the text to a single line
      adjustsFontSizeToFit // Allows the text to scale its font size to fit within its container
      style={{ ...styles.root, ...style, fontSize: normalize(fontSize) }} // Merges default styles with custom styles, and applies normalized font size
    >
      {children}{" "}
      {/* Renders the children (content inside the Text component) */}
    </Text>
  );
};

export default Text; // Exporting the Text component to be used in other parts of the app

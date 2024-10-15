import { FormLayout, TimeButton, TimeSelector } from "../components";
import { APP_FONTS, COLORS } from "../constants";
import { useShowSeconds, useTimeFont, useTimeFormat } from "../hooks";
import { saveConfig } from "../utils/cache";
 
// Export a functional component called FontsScreen that takes 'navigation' as a prop
export const FontsScreen = ({ navigation }) => {
 
  // Extract timeFont and setTimeFont from the custom hook useTimeFont
  // timeFont is the current font used for the time display, and setTimeFont allows updating it
  const { timeFont, setTimeFont } = useTimeFont();
 
  // Extract timeFormat from the custom hook useTimeFormat
  // timeFormat determines whether the time is displayed in 'am_pm' or '24h' format
  const { timeFormat } = useTimeFormat();
 
  // Extract showSeconds from the custom hook useShowSeconds
  // showSeconds is a boolean indicating whether or not to display seconds in the time display
  const { showSeconds } = useShowSeconds();
 
  // Function to handle saving the selected time font
  const doSave = () => {
    // Call saveConfig function to save the current font configuration
    saveConfig({ timeFont });
 
    // Navigate to the 'HomeScreen' after saving the configuration
    navigation.navigate("HomeScreen");
  };
 
  // Return the component's UI
  return (
    // FormLayout is a custom component, likely providing a layout with save functionality
    // doSave function is passed to handle what happens when the user saves the form
    <FormLayout onSave={doSave}>
 
      {/* TimeSelector wraps all TimeButton components and allows selecting a timeFont */}
      {/* value is the current selected timeFont, onChange updates it using setTimeFont */}
      <TimeSelector value={timeFont} onChange={setTimeFont}>
 
        {/* Loop over APP_FONTS (an array of available fonts) and render a TimeButton for each one */}
        {APP_FONTS.map((font) => (
 
          {/* TimeButton is used for selecting a font. Each button represents one font from APP_FONTS */}
          {/* key is the font name to help React identify each component in the list */}
          <TimeButton
            key={font}  // Unique key for each font button
            value={font}  // The font this button represents
            color={COLORS.base}  // The base color for the button border
            font={font}  // Font to be displayed (same as the font this button represents)
            format={timeFormat}  // Pass the current time format ('am_pm' or '24h') from timeFormat hook
            showSeconds={showSeconds}  // Whether to show seconds in the time display, from showSeconds hook
          />
        ))}
      </TimeSelector>
    </FormLayout>
  );
};
 
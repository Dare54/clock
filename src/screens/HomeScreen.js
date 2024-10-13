import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // For safe layout considering notches, etc.
import { useKeepAwake } from "expo-keep-awake"; // Prevents the screen from sleeping.
import { useTranslation } from "react-i18next"; // Internationalization hook for translations.
import { StatusBar } from "expo-status-bar"; // Provides status bar styling.

import dayjs from "../utils/dayjs"; // Day.js utility library for handling date and time.
import {
  FALLBACK_LANGUAGE, // Fallback language in case the selected language isn't supported.
  GAP, // Spacing constant.
  PALETTE, // Color palette, including the app's black background.
  SUPPORTED_LANGUAGES // List of supported languages.
} from "../constants";

// Custom hooks to get app settings from Redux or state.
import {
  useBatteryLevel, // Custom hook to retrieve battery level.
  useOrientation, // Custom hook to get device orientation (portrait or landscape).
  useShowBattery, // Whether to display the battery level.
  useShowDate, // Whether to display the date.
  useShowSeconds, // Whether to display seconds in the time display.
  useTimeColor, // The selected color for displaying time.
  useTimeFont, // The selected font for displaying time.
  useTimeFormat // The selected time format (24-hour or AM/PM).
} from "../Hooks";

// Components used in the screen layout.
import {
  BatteryIcon, // Displays battery level as an icon.
  DateDisplay, // Displays the current date.
  IconButton, // A button with an icon (in this case, a settings button).
  MenuItem, // Menu item inside the modal menu.
  ModalMenu, // A modal that opens with several menu options.
  TimeDisplay // Displays the current time.
} from "../components";
import SettingsIcon from "../../assets/images/settings-icon.svg"; // The settings icon for the button.

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: PALETTE.black, // Set the background color to black.
    flex: 1, // Makes the container take up the full screen.
    justifyContent: "space-evenly" // Evenly distribute content within the container.
  },
  display: {
    alignItems: "center", // Center content horizontally.
    paddingHorizontal: 4 * GAP // Adds horizontal padding.
  },
  time: {
    marginBottom: GAP // Adds margin below the time display.
  },
  date: {
    marginBottom: 2.5 * GAP // Adds more margin below the date display.
  }
});

export const HomeScreen = ({ navigation }) => {
  useKeepAwake(); // Keeps the screen on when the HomeScreen is displayed.
  const { t, i18n } = useTranslation("home"); // Get the translation function and i18n instance.
  const orientation = useOrientation(); // Get the current screen orientation.
  const level = useBatteryLevel(); // Get the current battery level.
  const [showModalMenu, setShowModalMenu] = useState(false); // Controls whether the modal menu is visible.
  const [time, setTime] = useState(dayjs()); // Stores the current time using Day.js.

  // Get app settings from custom hooks.
  const { timeColor } = useTimeColor();
  const { timeFont } = useTimeFont();
  const { timeFormat } = useTimeFormat();
  const { showSeconds } = useShowSeconds();
  const { showDate } = useShowDate();
  const { showBattery } = useShowBattery();

  // Update the locale of dayjs when the language changes.
  useEffect(() => {
    const lang = i18n.resolvedLanguage;
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      dayjs.locale(lang); // Set the locale to the resolved language.
    } else {
      dayjs.locale(FALLBACK_LANGUAGE); // Use fallback language if not supported.
    }
  }, [i18n.resolvedLanguage]); // Re-run when the resolved language changes.

  // Update the displayed time every 333 milliseconds (approximately 1/3 of a second).
  useEffect(() => {
    const updateTime = () => setTime(dayjs()); // Updates the time using dayjs.
    const i = setInterval(() => updateTime(), 333); // Re-run the update every 333 milliseconds.
    updateTime(); // Immediate time update when the component mounts.
    return () => clearInterval(i); // Clear the interval when the component unmounts.
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {/* Main time, date, and battery level display section */}
      <View style={styles.display}>
        <TimeDisplay
          value={time} // Current time value.
          color={timeColor} // Text color for time.
          format={timeFormat} // Time format (24-hour or AM/PM).
          showSeconds={showSeconds} // Whether to display seconds.
          font={timeFont} // Font used for the time display.
          style={styles.time} // Custom styling for the time.
        />
        {/* Conditionally render the date display if showDate is true */}
        {showDate && (
          <DateDisplay value={time} color={timeColor} style={styles.date} />
        )}
        {/* Conditionally render the battery icon if showBattery is true */}
        {showBattery && <BatteryIcon value={100 * level} color={timeColor} />}
      </View>
      {/* Render the settings icon button in portrait mode */}
      {orientation === "portrait" && (
        <IconButton
          icon={<SettingsIcon width={36} height={32} fill={timeColor} />} // Settings icon.
          onPress={() => setShowModalMenu(true)} // Open the modal menu when pressed.
        />
      )}
      {/* Modal menu with navigation options */}
      <ModalMenu open={showModalMenu} onClose={() => setShowModalMenu(false)}>
        <MenuItem
          label={t`preferences`} // Label for the preferences option.
          onPress={() => navigation.navigate("SettingsScreen")} // Navigate to the settings screen.
        />
        <MenuItem
          label={t`fonts`} // Label for the fonts option.
          onPress={() => navigation.navigate("FontsScreen")} // Navigate to the fonts screen.
        />
        <MenuItem
          label={t`colors`} // Label for the colors option.
          onPress={() => navigation.navigate("ColorsScreen")} // Navigate to the colors screen.
        />
      </ModalMenu>
      <StatusBar hidden />
    </SafeAreaView>
  );
};

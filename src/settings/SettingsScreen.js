import { useTranslation } from "react-i18next";

import {
  useShowBattery,
  useShowDate,
  useShowSeconds,
  useTimeFormat
} from "../Hooks";
import { AM_PM, H24 } from "../constants";
import {
  CheckboxField,
  FormLayout,
  RadioButton,
  RadioField
} from "../components";
import { saveConfig } from "../utils/cache";

// SettingsScreen component: This screen allows users to configure time format,
// and options like showing seconds, date, and battery.
// It takes 'navigation' as a prop to navigate between screens.
export const SettingsScreen = ({ navigation }) => {
  // Extract the translation function 't' using the useTranslation hook,
  // which is configured to use the 'settings' translation namespace.
  const { t } = useTranslation("settings");

  // Extract the current time format and its setter function from useTimeFormat hook.
  const { timeFormat, setTimeFormat } = useTimeFormat();

  // Extract the current state of 'showSeconds' and its setter function from useShowSeconds hook.
  const { showSeconds, setShowSeconds } = useShowSeconds();

  // Extract the current state of 'showDate' and its setter function from useShowDate hook.
  const { showDate, setShowDate } = useShowDate();

  // Extract the current state of 'showBattery' and its setter function from useShowBattery hook.
  const { showBattery, setShowBattery } = useShowBattery();

  // doSave function: This function is called when the user presses the save button.
  // It saves the current settings (time format, showSeconds, showDate, showBattery)
  // by calling saveConfig and navigates back to the 'HomeScreen' afterward.
  const doSave = () => {
    saveConfig({
      timeFormat,
      showSeconds,
      showDate,
      showBattery
    });
    navigation.navigate("HomeScreen"); // Navigates to the HomeScreen after saving.
  };

  return (
    // FormLayout component provides a layout for the settings form.
    // It passes the doSave function to handle the save button press.
    <FormLayout onSave={doSave}>
      {/* RadioField component to toggle between time formats (24h or AM/PM).
      The selected value is 'timeFormat', and 'setTimeFormat' is used to update it. */}
      <RadioField value={timeFormat} onChange={setTimeFormat}>
        {/* RadioButton components for the two time format options. */}
        <RadioButton value={H24} label={t`use 24h format`} />
        <RadioButton value={AM_PM} label={t`use am|pm format`} />
      </RadioField>

      {/* CheckboxField component for toggling the display of seconds.
      It passes 'showSeconds' as the current value and 'setShowSeconds' to handle changes. */}
      <CheckboxField
        label={t`show seconds`}
        value={showSeconds}
        onChange={setShowSeconds}
      />

      {/* CheckboxField component for toggling the display of the date. */}
      <CheckboxField
        label={t`show date`}
        value={showDate}
        onChange={setShowDate}
      />

      {/* CheckboxField component for toggling the display of battery percentage. */}
      <CheckboxField
        label={t`show battery`}
        value={showBattery}
        onChange={setShowBattery}
      />
    </FormLayout>
  );
};

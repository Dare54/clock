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

export const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation("settings");

  const { timeFormat, setTimeFormat } = useTimeFormat();

  const { showSeconds, setShowSeconds } = useShowSeconds();

  const { showDate, setShowDate } = useShowDate();

  const { showBattery, setShowBattery } = useShowBattery();

  const doSave = () => {
    saveConfig({
      timeFormat,
      showSeconds,
      showDate,
      showBattery
    });
    navigation.navigate("HomeScreen");
  };

  return (
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

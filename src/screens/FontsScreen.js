import { FormLayout, TimeButton, TimeSelector } from "../components";
import { APP_FONTS, COLORS } from "../constants";
import { useShowSeconds, useTimeFont, useTimeFormat } from "../Hooks";
import { saveConfig } from "../utils/cache";

export const FontsScreen = ({ navigation }) => {
  const { timeFont, setTimeFont } = useTimeFont();
  const { timeFormat } = useTimeFormat();
  const { showSeconds } = useShowSeconds();
  const doSave = () => {
    saveConfig({ timeFont });
    navigation.navigate("HomeScreen");
  };

  return (
    <FormLayout onSave={doSave}>
      <TimeSelector value={timeFont} onChange={setTimeFont}>
        {APP_FONTS.map((font) => (
          <TimeButton
            key={font}
            value={font}
            color={COLORS.base}
            font={font}
            format={timeFormat}
            showSeconds={showSeconds}
          />
        ))}
      </TimeSelector>
    </FormLayout>
  );
};

export default FontsScreen;

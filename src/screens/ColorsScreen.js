import { FormLayout, TimeButton, TimeSelector } from "../components";
import { APP_COLORS } from "../constants";
import {
  useShowSeconds,
  useTimeColor,
  useTimeFont,
  useTimeFormat
} from "../Hooks";
import { saveConfig } from "../utils/cache";

export const ColorsScreen = ({ navigation }) => {
  const { timeColor, setTimeColor } = useTimeColor();
  const { timeFont } = useTimeFont();
  const { timeFormat } = useTimeFormat();
  const { showSeconds } = useShowSeconds();
  const doSave = () => {
    saveConfig({ timeColor });
    navigation.navigate("HomeScreen");
  };

  return (
    <FormLayout onSave={doSave}>
      <TimeSelector value={timeColor} onChange={setTimeColor}>
        {APP_COLORS.map((color) => (
          <TimeButton
            key={color}
            value={color}
            color={color}
            font={timeFont}
            format={timeFormat}
            showSeconds={showSeconds}
          />
        ))}
      </TimeSelector>
    </FormLayout>
  );
};

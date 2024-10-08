import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import {
  BatteryIcon,
  DateDisplay,
  IconButton,
  MenuItem,
  ModalMenu,
  SettingsIcon,
  StatusBar,
  TimeDisplay
} from "../components";
import { useBatteryLevel, useOrientation } from "../Hooks";
import { GAP, PALETTE } from "../constants";

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: PALETTE.black,
    flex: 1,
    justifyContent: "space-evenly"
  },
  display: {
    alignItems: "center",
    paddingHorizontal: 4 * GAP
  },
  time: {
    marginBottom: GAP
  },
  date: {
    marginBottom: 2.5 * GAP
  }
});

//main screen
export default HomeScreen = ({ navigation }) => {
  //hooks
  useKeepAwake();
  const { t, i18n } = useTranslation("home");
  const orientation = useOrientation();
  const level = useBatteryLevel();
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [time, setTime] = useState(dayjs());
  const { timeColor } = useTimeColor();
  const { timeFont } = useTimeFont();
  const { timeFormat } = useTimeFormat();
  const { showSeconds } = useShowSeconds();
  const { showDate } = useShowDate();
  const { showBattery } = useShowBattery();

  useEffect(() => {
    const lang = i18n.resolvedLanguage;
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      dayjs.locale(lang);
    } else {
      dayjs.locale(FALLBACK_LANGUAGE);
    }
  }, [i18n.resolvedLanguage]);

  //effect that gets current local time before initial screen render
  useEffect(() => {
    const updateTime = () => setTime(dayjs());
    // setInterval is not precise enough in some devices
    // so I decided to use 1/3 seconds (approx. 333 milliseconds)
    // to always show an accurate time
    const i = setInterval(() => updateTime(), 333);
    updateTime();
    return () => clearInterval(i);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.display}>
        <TimeDisplay
          value={time}
          color={timeColor}
          format={timeFormat}
          showSeconds={showSeconds}
          font={timeFont}
          style={styles.time}
        />
        {showDate && (
          <DateDisplay value={time} color={timeColor} style={styles.date} />
        )}
        {showBattery && <BatteryIcon value={100 * level} color={timeColor} />}
      </View>

      {orientation === "portrait" && (
        <IconButton
          icon={<SettingsIcon width={36} height={32} fill={timeColor} />}
          onPress={() => setShowModalMenu(true)}
        />
      )}

      <ModalMenu open={showModalMenu} onClose={() => setShowModalMenu(false)}>
        <MenuItem
          label={t`preferences`}
          onPress={() => navigation.navigate("SettingsScreen")}
        />
        <MenuItem
          label={t`fonts`}
          onPress={() => navigation.navigate("FontsScreen")}
        />
        <MenuItem
          label={t`colors`}
          onPress={() => navigation.navigate("ColorsScreen")}
        />
      </ModalMenu>
      <StatusBar hidden />
    </SafeAreaView>
  );
};

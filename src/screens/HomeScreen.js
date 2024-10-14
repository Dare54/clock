import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useKeepAwake } from "expo-keep-awake";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";

import dayjs from "../utils/dayjs";
import {
  FALLBACK_LANGUAGE,
  GAP,
  PALETTE,
  SUPPORTED_LANGUAGES
} from "../constants";
import {
  useBatteryLevel,
  useOrientation,
  useShowBattery,
  useShowDate,
  useShowSeconds,
  useTimeColor,
  useTimeFont,
  useTimeFormat
} from "../Hooks";
import {
  BatteryIcon,
  DateDisplay,
  IconButton,
  MenuItem,
  ModalMenu,
  TimeDisplay
} from "../components";
import SettingsIcon from "../../assets/images/settings-icon.svg";
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

export const HomeScreen = ({ navigation }) => {
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

  useEffect(() => {
    const updateTime = () => setTime(dayjs());
    const i = setInterval(() => updateTime(), 333);
    updateTime();
    return () => clearInterval(i);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {/* Main time, date, and battery level display section */}
      <View style={styles.display}>
        <TimeDisplay
          value={time}
          color={timeColor}
          format={timeFormat}
          showSeconds={showSeconds}
          font={timeFont}
          style={styles.time}
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
          icon={<SettingsIcon width={36} height={32} fill={timeColor} />}
          onPress={() => setShowModalMenu(true)}
        />
      )}
      {/* Modal menu with navigation options */}
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

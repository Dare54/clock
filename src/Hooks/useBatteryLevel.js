import { useEffect, useState } from "react";
import * as Battery from "expo-battery";

export const useBatteryLevel = () => {
  const [level, setLevel] = useState(-1);

  useEffect(() => {
    // checks the battery level every minute
    const interval = setInterval(() => {
      Battery.getBatteryLevelAsync().then(setLevel);
    }, 60000);

    Battery.getBatteryLevelAsync().then(setLevel);
    return () => clearInterval(interval);
  }, []);

  return level;
};

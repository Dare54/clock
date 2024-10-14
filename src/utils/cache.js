import { boolean, fix, parse, string } from "@gchumillas/schema-fixer";
import * as SecureStore from "expo-secure-store";

import {
  AM_PM,
  APP_COLORS,
  APP_FONTS,
  DEFAULT_CONFIG,
  H24
} from "../constants";

const configSchema = {
  timeFormat: string({ options: [H24, AM_PM] }),
  timeFont: string({ options: APP_FONTS }),
  timeColor: string({ options: APP_COLORS }),
  showSeconds: boolean({ require: true }),
  showDate: boolean({ require: true }),
  showBattery: boolean({ require: true })
};

/**
 * Retrieves the app configuration from SecureStore.
 * Parses the configuration to match the schema, and returns either the parsed config or the default config if errors are found.
 *
 * @returns {Promise<{
 *  timeFormat: string, // The current time format (either '24-hour' or 'AM/PM')
 *  showSeconds: boolean, // Whether to display seconds on the clock
 *  showDate: boolean, // Whether to display the date
 *  showBattery: boolean // Whether to display the battery level
 * }>}
 */
export const getConfig = async () => {
  const value = await SecureStore.getItemAsync("config");

  const [config, errors] = parse(JSON.parse(value), configSchema);

  if (errors.length) {
    return DEFAULT_CONFIG;
  }

  return config;
};

/**
 * Saves the given configuration object to SecureStore.
 * The new config is merged with the existing one, validated, and then stored securely.
 *
 * @param {object} config - The new configuration values to save.
 * @param {string} [config.timeColor] - The new time color.
 * @param {string} [config.timeFont] - The new time font.
 * @param {string} [config.timeFormat] - The new time format (either '24-hour' or 'AM/PM').
 * @param {boolean} [config.showSeconds] - Whether to display seconds.
 * @param {boolean} [config.showDate] - Whether to display the date.
 * @param {boolean} [config.showBattery] - Whether to display the battery level.
 */
export const saveConfig = async (config) => {
  const cfg = await getConfig();

  const fixedConfig = fix({ ...cfg, ...config }, configSchema);

  return SecureStore.setItemAsync("config", JSON.stringify(fixedConfig));
};

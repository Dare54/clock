// Importing necessary functions from the "@gchumillas/schema-fixer" package.
// These functions are used for schema validation and fixing data to conform to a schema.
import { boolean, fix, parse, string } from "@gchumillas/schema-fixer";

// Importing SecureStore from Expo, used for securely storing sensitive key-value pairs.
import * as SecureStore from "expo-secure-store";

// Importing constants used in the app, like time format options, available colors and fonts, and default configuration values.
import {
  AM_PM, // 12-hour time format option
  APP_COLORS, // Available app colors for time display
  APP_FONTS, // Available app fonts for time display
  DEFAULT_CONFIG, // The default configuration to fall back on
  H24 // 24-hour time format option
} from "../constants";

// Schema definition for the app's configuration object.
// This schema is used to validate and sanitize config values from storage.
const configSchema = {
  timeFormat: string({ options: [H24, AM_PM] }), // Ensures timeFormat is either '24-hour' or 'AM/PM'
  timeFont: string({ options: APP_FONTS }), // Ensures timeFont is one of the predefined fonts
  timeColor: string({ options: APP_COLORS }), // Ensures timeColor is one of the predefined colors
  showSeconds: boolean({ require: true }), // Requires showSeconds to be a boolean value
  showDate: boolean({ require: true }), // Requires showDate to be a boolean value
  showBattery: boolean({ require: true }) // Requires showBattery to be a boolean value
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
  // Retrieve the stored configuration string from SecureStore
  const value = await SecureStore.getItemAsync("config");

  // Parse the stored config using the defined schema.
  // `parse` returns the validated config and any errors found during validation.
  const [config, errors] = parse(JSON.parse(value), configSchema);

  // If there are any validation errors, return the default configuration.
  if (errors.length) {
    return DEFAULT_CONFIG;
  }

  // Return the validated config.
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
  // Get the existing configuration from SecureStore.
  const cfg = await getConfig();

  // Merge the new config values with the existing ones.
  // Then use `fix` to ensure the merged config adheres to the schema.
  const fixedConfig = fix({ ...cfg, ...config }, configSchema);

  // Save the validated and fixed config back to SecureStore.
  return SecureStore.setItemAsync("config", JSON.stringify(fixedConfig));
};

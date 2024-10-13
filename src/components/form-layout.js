import {
  Platform,
  StatusBar as RNStatusBar,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";

import { GAP, PALETTE } from "../constants";
import Button from "./button";

const styles = StyleSheet.create({
  root: {
    backgroundColor: PALETTE.black,
    flex: 1
  },
  wrapper: {
    backgroundColor: PALETTE.black,
    flex: 1,
    padding: 2 * GAP,
    paddingTop: GAP + (Platform.OS === "ios" ? 0 : RNStatusBar.currentHeight)
  },
  body: {
    flexGrow: 1,
    marginVertical: 2 * GAP
  }
});

/**
 * @param {object} params
 * @param {React.ReactNode} params.children
 * @param {() => void} params.onSave
 */

// FormLayout component: This is a layout component for a form that includes
// children components, a save button, and a status bar.
// It takes 'children' and 'onSave' as props.
const FormLayout = ({ children, onSave }) => {
  // Extract the translation function 't' using the useTranslation hook,
  // which is configured to use the 'settings' translation namespace.
  const { t } = useTranslation("settings");

  return (
    // SafeAreaView ensures the layout is adjusted for device-specific safe areas,
    // such as notches or status bars.
    <SafeAreaView style={styles.root}>
      {/* Wrapper view that contains both the scrollable form body and the save button. */}
      <View style={styles.wrapper}>
        {/* ScrollView allows the form to scroll if its content exceeds the screen height.
          It renders the children elements passed to FormLayout. */}
        <ScrollView style={styles.body}>{children}</ScrollView>

        {/* Button component at the bottom of the form, with the label 
          'save' translated based on the current language settings.
          'onPress' calls the 'onSave' function passed as a prop. */}
        <Button label={t`save`} onPress={onSave} />
      </View>

      {/* ExpoStatusBar: Customizes the status bar, setting it to 'light' mode. */}
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
};

export default FormLayout;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import resources from "./resources";

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: "languageDetector",
  async: true, // flags below detection to be async
  detect: (callback) => {
    //using deprecated method due to ongoing issue in iOS
    // https://github.com/expo/expo/issues/24350
    // return /*'en'; */ Localization.locale.then(({ locale }) => {
    //   callback(locale);
    // });
    return "en";
  },

  init: () => {},

  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    fallbackNS: "common",
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    parseMissingKeyHandler: (key) => `[${key}]`
  });

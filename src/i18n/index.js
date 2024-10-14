import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import resources from "./resources";

const languageDetector = {
  type: "languageDetector",
  async: true,
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

import React from "react";
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEng from "./locales/en/translation.json";
import translationPol from "./locales/pl/translation.json";

i18n
  .use(LanguageDetector)
  .init(
    {
      debug: true,
      // lng: "pl",
      fallbackLng: "en",

      keySeparator: false, // we use content as keys

      interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
      },

      // we init with resources
      resources: {
        en: {
          translations: translationEng,
        },

        pl: {
          translations: translationPol,
        },
      },

      // have a common namespace used around the full app
      ns: ["translations"],
      defaultNS: "translations",

      // react: {
      //   wait: true
      // }
    }
  );

export default i18n;
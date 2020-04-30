import React from "react";

import {
  isBrowser,
  isMobile,
  isTablet,
  isSmartTV,
  isConsole,
  isWearable,
  isMobileSafari,
  isChromium,
  isMobileOnly,
  isAndroid,
  isWinPhone,
  isIOS,
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  isEdge,
  isYandex,
  isIOS13,
  isIPad13,
  isIPhone13,
  isIPod13,
  isElectron,
  osVersion,
  osName,
  fullBrowserVersion,
  browserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  engineName,
  engineVersion,
  getUA,
  deviceType
} from 'react-device-detect';

function isMacOS() {
  return osName === 'Mac OS';
}

function isDestop() {
  return deviceType === 'desktop';
}


// import { useTranslation } from 'react-i18next';

export default function GeneralPlatform() {
  // const {t} = useTranslation();

  // if (!if(isIOS)) {
  //   return;
  // }

  const all = {
    isBrowser,
    isMobile,
    isTablet,
    isSmartTV,
    isConsole,
    isWearable,
    isMobileSafari,
    isChromium,
    isMobileOnly,
    isAndroid,
    isWinPhone,
    isIOS,
    isChrome,
    isFirefox,
    isSafari,
    isOpera,
    isIE,
    isEdge,
    isYandex,
    isIOS13,
    isIPad13,
    isIPhone13,
    isIPod13,
    isElectron,
    osVersion,
    osName,
    fullBrowserVersion,
    browserVersion,
    browserName,
    mobileVendor,
    mobileModel,
    engineName,
    engineVersion,
    getUA,
    deviceType
  };


  return (
    <div>
      { JSON.stringify(all) }
    </div>
  );
}
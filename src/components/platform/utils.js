import {
  isConsole,
  isMobile,
  isTablet,
  isIOS,
  isIOS13,
  isIPhone13,
  isIPad13,
  isSmartTV,
  isWearable,
  osName,
  browserVersion
} from "react-device-detect";

export function isDesktop() {
  return !isMobile
    && !isTablet
    && !isSmartTV
    && !isConsole
    && !isWearable;
}

export function isIpad() {
  return isMobile
    && isTablet
    && isIOS
    && !isIPad13;
}

export function isIpad13() {
  return isMobile
    && isTablet
    && isIOS13
    && isIPad13;
}

export function isIphone() {
  return isMobile
    && !isTablet
    && isIOS13
    && isIPhone13
    && isMacOS()
    && parseInt(browserVersion) <= 12;
}

export function isIphone13() {
  return isMobile
    && !isTablet
    && isIOS13
    && isIPhone13
    && !isIPad13
    && parseInt(browserVersion) >= 13;
}

export function isMacOS() {
  return osName === 'Mac OS';
}


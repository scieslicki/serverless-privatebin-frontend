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

import {
  isDesktop,
  isIphone13,
  isIphone,
  isMacOS,
  isIpad,
  isIpad13
} from "./platform/utils";

export default function PlatformDepend({
                                         children,
                                         debug = false,
                                         android = false,
                                         desktop = false,
                                         ios = false,
                                         ios13 = false,
                                         ipad = false,
                                         ipad13 = false,
                                         iphone = false,
                                         iphone13 = false,
                                         macos = false,
                                         mobile = false,
                                         pc = false,
                                         tablet = false,
                                         ...rest }) {

  let showing = false;
  let info = [];

  if (isAndroid && android) {
    showing = true;
    if (debug) info.push('Android');
  }

  if (isIOS && ios) {
    showing = true;
    if (debug) info.push('iOS');
  }

  if (isIOS13 && ios13) {
    showing = true;
    if (debug) info.push('iOS13');
  }

  if (isMobile && mobile) {
    showing = true;
    if (debug) info.push('mobile');
  }

  if (isTablet && tablet) {
    showing = true;
    if (debug) info.push('tablet');
  }


  if (isDesktop() && desktop) {
    showing = true;
    if (debug) info.push('desktop');
  }

  if (isIpad() && ipad) {
    showing = true;
    if (debug) info.push('iPad');
  }

  if (isIpad13() && ipad13) {
    showing = true;
    if (debug) info.push('iPad13');
  }

  if (isIphone() && iphone) {
    showing = true;
    if (debug) info.push('iPhone');
  }

  if (isIphone13() && iphone13) {
    showing = true;
    if (debug) info.push('iPhone13');
  }

  if (isMacOS() && macos && isDesktop()) {
    showing = true;
    if (debug) info.push('MacOS');
  }

  if (!isMacOS() && pc && isDesktop()) {
    showing = true;
    if (debug) info.push('pc');
  }

  if (showing) {
    return (
      <div {...rest}>
        {children}
        {info.join(', ')}
      </div>
    );
  }

  return (<></>);

}
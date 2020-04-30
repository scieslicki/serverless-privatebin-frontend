import React from "react";
import MacOsPlatform from "./platform/macos";
import GeneralPlatform from "./platform/general";
import IOsPlatform from "./platform/ios";
import TabletPlatform from "./platform/tablet";
import AndroidPlatform from "./platform/android";
import DesktopPlatform from "./platform/desktop";
import MobilePlatform from "./platform/mobile";
import PcPlatform from "./platform/pc";
import IOs13Platform from "./platform/ios13";
import IPadPlatform from "./platform/ipad";
import IPad13Platform from "./platform/ipad13";
import IPhonePlatform from "./platform/iphone";
import IPhone13Platform from "./platform/iphone13";
// import { useTranslation } from 'react-i18next';

export default function Platform() {
  // const {t} = useTranslation();

  return (
    <>
      {/*<DesktopPlatform />*/}
      {/*<MacOsPlatform />*/}
      {/*<PcPlatform />*/}

      {/*<MobilePlatform />*/}
      {/*<IOsPlatform />*/}
      {/*<IOs13Platform />*/}
      {/*<AndroidPlatform />*/}
      <IPhonePlatform />
      <IPhone13Platform />

      {/*<TabletPlatform />*/}
      <IPadPlatform />
      <IPad13Platform />

      {/*<GeneralPlatform />*/}
    </>
  );
}
import React from "react";

import {
  isMobile,
} from 'react-device-detect';

// import { useTranslation } from 'react-i18next';

export default function MobilePlatform() {
  // const {t} = useTranslation();

  if (!isMobile) {
    return (<></>);
  }

  return (
    <div>
      Mobile
    </div>
  );
}
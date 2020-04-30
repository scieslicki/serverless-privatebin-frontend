import React from "react";

import {
  isAndroid,
} from 'react-device-detect';

// import { useTranslation } from 'react-i18next';

export default function AndroidPlatform() {
  // const {t} = useTranslation();

  if (!isAndroid) {
    return (<></>);
  }

  return (
    <div>
      Android
    </div>
  );
}
import React from "react";

import {
  isTablet,
} from 'react-device-detect';

// import { useTranslation } from 'react-i18next';

export default function TabletPlatform() {
  // const {t} = useTranslation();

  if (!isTablet) {
    return (<></>);
  }

  return (
    <div>
      tablet
    </div>
  );
}
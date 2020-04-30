import React from "react";

import {
  isIOS,
} from 'react-device-detect';

// import { useTranslation } from 'react-i18next';

export default function IOsPlatform() {
  // const {t} = useTranslation();

  if (!isIOS) {
    return (<></>);
  }

  return (
    <>
      {/*iOS*/}
    </>
  );
}
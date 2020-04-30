import React from "react";

import {
  isIOS13,
} from 'react-device-detect';

// import { useTranslation } from 'react-i18next';

export default function IOs13Platform() {
  // const {t} = useTranslation();

  if (!isIOS13) {
    return (<></>);
  }

  return (
    <>
      {/*iOS13*/}
    </>
  );
}

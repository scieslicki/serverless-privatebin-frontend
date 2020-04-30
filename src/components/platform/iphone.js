import React from "react";

import {isIphone} from "./utils";

// import { useTranslation } from 'react-i18next';

export default function IPhonePlatform() {
  // const {t} = useTranslation();

  if (!isIphone()) {
    return (<></>);
  }

  return (
    <div>
      iPhone
    </div>
  );
}
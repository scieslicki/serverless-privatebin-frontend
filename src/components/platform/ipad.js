import React from "react";

import {isIpad} from "./utils";

// import { useTranslation } from 'react-i18next';

export default function IpadPlatform() {
  // const {t} = useTranslation();

  if (!isIpad()) {
    return (<></>);
  }

  return (
    <div>
      iPad
    </div>
  );
}
import React from "react";

import {isIpad} from "./utils";

// import { useTranslation } from 'react-i18next';

export default function IpadPlatform({ children, ...rest }) {
  // const {t} = useTranslation();

  if (!isIpad()) {
    return (<></>);
  }

  return (
    <div {...rest}>
      {children}
      iPad
    </div>
  );
}
import React from "react";

import {isDesktop, isMacOS} from "./utils";

// import { useTranslation } from 'react-i18next';

export default function MacOsPlatform({ children, ...rest }) {
  // const {t} = useTranslation();

  if (!isDesktop()) {
    return (<></>);
  }

  if (!isMacOS()) {
    return (<></>);
  }

  return (
    <div {...rest}>
      {children}
      MacOS
    </div>
  );
}
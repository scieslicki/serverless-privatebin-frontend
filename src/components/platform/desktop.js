import React from "react";

import {isDesktop} from "./utils";

// import { useTranslation } from 'react-i18next';

export default function DesktopPlatform() {
  // const {t} = useTranslation();

  if (!isDesktop()) {
    return (<></>);
  }

  return (
    <div>
      Desktop
    </div>
  );
}
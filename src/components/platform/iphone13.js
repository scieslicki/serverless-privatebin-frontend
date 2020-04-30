import React from "react";

import {isIphone13} from "./utils";

// import { useTranslation } from 'react-i18next';

export default function IPhone13Platform() {
  // const {t} = useTranslation();

  if (!isIphone13()) {
    return (<></>);
  }

  return (
    <div>
      iPhone13
    </div>
  );
}
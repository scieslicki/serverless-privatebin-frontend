import React from "react";

import {isIpad13} from "./utils";

// import { useTranslation } from 'react-i18next';

export default function IPad13Platform() {
  // const {t} = useTranslation();

  if (!isIpad13()) {
    return (<></>);
  }

  return (
    <div>
      iPad13
    </div>
  );
}

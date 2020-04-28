import React from "react";
import "./NotFound.css";
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t, i18n } = useTranslation();

  console.log('aaa');

  return (
    <div className="NotFound">
      <h3>{t("Sorry, page not found!")}</h3>
    </div>
  );
}
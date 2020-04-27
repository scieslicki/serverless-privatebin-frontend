import React from "react";
import QRCode from "qrcode.react";
import {FormControl} from "react-bootstrap";
import {CopyToClipboard} from "react-copy-to-clipboard";
import "./UrlInfo.css";
import { useTranslation } from 'react-i18next';

export default function UrlInfo({note, url = null}) {
  if (!url) {
    url = window.location.href + note.noteId;
  }

  const { t, i18n } = useTranslation();

  return (
  <>
    <div className="info">
      <div className="qr-code">
        <QRCode value={url}/>
      </div>

      <div className='url-link'>
        <FormControl type="text" value={url} readOnly/>
        <CopyToClipboard text={url}>
          <button>{t("Copy URL")}...</button>
        </CopyToClipboard>
      </div>
    </div>
  </>
  );
}
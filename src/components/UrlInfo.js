import React from "react";
import QRCode from "qrcode.react";
import {FormControl} from "react-bootstrap";
import {CopyToClipboard} from "react-copy-to-clipboard";
import "./UrlInfo.css";
import { useTranslation } from 'react-i18next';
import Mailto from "./Mailto";

export default function UrlInfo({note, url = null}) {
  if (!url) {
    url = window.location.href + note.noteId;
  }

  const { t } = useTranslation();

  if (!note.content) {
    return (<></>);
  }

  return (
  <>
    <div className="info">
      <div className="qr-code">
        <QRCode value={url}/>
      </div>

      <div className="url-container">
        <div className='url-link'>
          <FormControl type="text" value={url} readOnly/>
          <CopyToClipboard text={url}>
            <button type="button">{t("Copy URL")}...</button>
          </CopyToClipboard>
        </div>
        <div className='send-email'>
          <Mailto
            email=''
            subject={t("You secured note")}
            body={`
  ${t('Hello')}
      
  ${t('Your secured note url is')}: ${url}
  
          `}>{t("Send by email")}...</Mailto>
          </div>
      </div>
    </div>
  </>
  );
}
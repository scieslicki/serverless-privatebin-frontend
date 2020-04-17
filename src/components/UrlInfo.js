import React from "react";
import QRCode from "qrcode.react";
import {FormControl} from "react-bootstrap";
import {CopyToClipboard} from "react-copy-to-clipboard";
import "./UrlInfo.css";

export default function UrlInfo({note}) {
  return (
  <>
    <div className="info">
      <div className="qr-code">
        <QRCode value={`${window.location.href}${note.noteId}`}/>
      </div>

      <div className='url-link'>
        <FormControl type="text" value={`${window.location.href}${note.noteId}`} readOnly/>
        <CopyToClipboard text={`${window.location.href}${note.noteId}`}>
          <button>Kopiuj url...</button>
        </CopyToClipboard>
      </div>
    </div>
  </>
  );
}
import React from "react";
import "./InfoBox.css";
import { useTranslation } from 'react-i18next';
import filesize from 'filesize';

export default function InfoBox({note}) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <span className='first-row'>
        <span>
          {t("Remaining views")}: <strong>{note.telomer}</strong>
        </span>
        <span>
          {t("Valid to")}: <strong>{new Date(note.timeToLive * 1000).toLocaleString()}</strong>
        </span>
      </span>
      <span className='second-row'>
        <span>
          {t("Type")}: {note.type}
        </span>
        <span>
          {t("Created at")}: {new Date(note.createdAt * 1000).toLocaleString()}
        </span>
      </span>
      <span className='third-row'>
        {note.size
          ? <span>
            {t("Size")}: {filesize(note.size)}
            {note.content && note.compression !== 'none'
              ? ' ('+ t("after compression") + ': ' + filesize(JSON.stringify(note.content).length) + ' / ' + (JSON.stringify(note.content).length / note.size * 100).toFixed(2) + '%) '
              : ''}
        </span>
          : <span></span>
        }
        {note.readAt
          ? <span>{t("Last Read at")}: {new Date(note.readAt * 1000).toLocaleString()}</span>
          : <span></span>
        }
      </span>
    </>
  );
}
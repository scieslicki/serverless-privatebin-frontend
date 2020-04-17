import React from "react";
import "./InfoBox.css";

export default function InfoBox({note}) {
  return (
    <>
      <span className='first-row'>
        <span>
          Pozostało wyświetleń: <strong>{note.telomer}</strong>
        </span>
        <span>
          Ważny do: <strong>{new Date(note.timeToLive * 1000).toLocaleString()}</strong>
        </span>
      </span>
      <span className='second-row'>
        <span>
          Typ: {note.type}
        </span>
        <span>
          Utworzono: {new Date(note.createdAt * 1000).toLocaleString()}
        </span>
      </span>
      <span className='third-row'>
        <span>&nbsp;</span>
        {note.readAt
          ? <span>Odczytano: {new Date(note.readAt * 1000).toLocaleString()}</span>
          : <span></span>
        }
      </span>
    </>
  );
}
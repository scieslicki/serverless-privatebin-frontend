import React from "react";
import NewNote from "./NewNote";
import {deleteNote, readNote} from "../libs/store-note";
import {useTranslation} from "react-i18next";

export default function Response() {

  const { t, i18n } = useTranslation();

  const note = readNote();
  deleteNote();

  return (<NewNote note={note}/>);
}

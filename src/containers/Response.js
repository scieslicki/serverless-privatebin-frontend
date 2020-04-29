import React from "react";
import NewNote from "./NewNote";
import {deleteNote, readNote} from "../libs/store-note";

export default function Response() {
  const note = readNote();
  deleteNote();

  return (<NewNote note={note}/>);
}

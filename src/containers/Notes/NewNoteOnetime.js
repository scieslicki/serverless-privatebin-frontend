import React from "react";
import "./NewNote.css";
import NewNote from "./NewNote";

export default function NewNoteOnetime() {
  return (<NewNote initial={1} addPasswordToUrl={true} />);
}
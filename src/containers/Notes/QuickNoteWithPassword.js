import React from "react";
import {useParams} from "react-router-dom";
import NewNote from "./NewNote";
import "./NewNote.css";

export default function QuickNoteWithPassword() {
  const {password, message} = useParams();

  return (<NewNote message={message} addPassword={password}/>);
}

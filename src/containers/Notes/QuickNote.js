import React from "react";
import {useParams} from "react-router-dom";
import NewNote from "./NewNote";
import "./NewNote.css";

export default function QuickNote() {
  const {message} = useParams();

  return (<><NewNote message={message}/></>);
}

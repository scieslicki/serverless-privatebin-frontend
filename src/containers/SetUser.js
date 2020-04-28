import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {saveUserId} from "../libs/readUserId";

export default function SetUser() {
  const {id} = useParams();

  saveUserId(id);

  const history = useHistory();

  history.push("/");

  return (<></>);
}

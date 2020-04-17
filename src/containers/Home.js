import React, { useState, useEffect } from "react";
import QRCode from 'qrcode.react';
import {PageHeader, ListGroup, ListGroupItem, FormControl, FormGroup} from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import * as uuid from "uuid";

export default function Home() {

  let storedUserId;

  if (localStorage.getItem('userId')) {
    storedUserId = localStorage.getItem('userId');
  } else {
    storedUserId = uuid.v1();
    localStorage.setItem('userId', storedUserId);
  }

  const [notes, setNotes] = useState([]);
  // const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      // if (!isAuthenticated) {
      //   return;
      // }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  // }, [isAuthenticated]);
  }, []);

  function loadNotes() {
    let myInit = {
      body: {},
      headers: {
        "UserId": storedUserId,
      }
    }

      return API.get("privatebin", "/privatebin", myInit);
  }


  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
          <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
            <ListGroupItem header={note.noteId}>
              <div>
                {"Ważny do: " + new Date(note.timeToLive * 1000).toLocaleString()}<br/>
                {"Zostało wyświetleń: " + note.telomer}<br/>
                {"Typ: " + note.type}<br/>
                {"Utworzono: " + new Date(note.createdAt * 1000).toLocaleString()}<br/>
              </div>
              <div>
                <QRCode value={`${window.location.href}notes/${note.noteId}`} />
              </div>
            </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {renderNotes()}
      {/*{isAuthenticated ? renderNotes() : renderLander()}*/}
    </div>
  );
}
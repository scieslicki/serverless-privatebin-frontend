import React, { useState, useEffect } from "react";
import QRCode from 'qrcode.react';
import {PageHeader, ListGroup, ListGroupItem, FormControl, Modal, Button } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import * as uuid from "uuid";
import {CopyToClipboard} from 'react-copy-to-clipboard';

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
        <div>
          <LinkContainer key={note.noteId} to={`/${note.noteId}`}>
            <ListGroupItem header={note.noteId}>
              <div class='first-row'>
                <div>
                  Pozostało wyświetleń: <strong>{ note.telomer}</strong>
                </div>
                <div>
                  Ważny do: <strong>{ new Date(note.timeToLive * 1000).toLocaleString()}</strong>
                </div>
              </div>
              <div class='second-row'>
                <div>
                  Typ: { note.type }
                </div>
                <div>
                  Utworzono: { new Date(note.createdAt * 1000).toLocaleString() }
                </div>
              </div>
            </ListGroupItem>
          </LinkContainer>

          <div class="info">
            <div class="qr-code">
              <QRCode value={`${window.location.href}${note.noteId}`} />
            </div>

            <div class='url-link'>
              <FormControl type="text" value={`${window.location.href}${note.noteId}`} readonly/>
              <CopyToClipboard text={`${window.location.href}${note.noteId}`}>
                <button>Kopiuj url...</button>
              </CopyToClipboard>
            </div>
          </div>

        </div>

    ) : (
        <LinkContainer key="new" to="/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Dodaj nową notkę...
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
        <PageHeader>Twoje szyfrowane notki:</PageHeader>
        { renderModal() }
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  function renderModal() {
    const handleRemoving = () => {

      storedUserId = uuid.v1();
      localStorage.setItem('userId', storedUserId);

      setNotes([]);

      handleClose();
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Wyczyść historię...
      </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Usunąć historię?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Usunięcie historii notek, spowoduje wyczyszczenie listy.</p>
            <p>Dostęp do notek, jeśli będą jeszcze ważne, będzie możliwy tylko przez ich indywidualny adres url</p>
            <p><strong>Nie będą już więcej wyświetlane na tej liście.</strong></p>
            <p><strong>Uwaga:</strong> Nie będzie można cofnąć tej akcji!</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Zamknij</Button>
            <Button variant="primary" onClick={handleRemoving}>Usuń</Button>
          </Modal.Footer>

        </Modal>
      </>
    );
  }

  return (
    <div className="Home">
      {renderNotes()}
      {/*{isAuthenticated ? renderNotes() : renderLander()}*/}
    </div>
  );
}
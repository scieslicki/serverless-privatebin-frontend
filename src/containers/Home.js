import React, { useState, useEffect } from "react";
import {PageHeader, ListGroup, ListGroupItem, FormControl, Modal, Button } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import InfoBox from "../components/InfoBox";
import UrlInfo from "../components/UrlInfo";
import RemovingModal from "../components/RemovingModal";
import { readUserId, createUserId } from "../libs/readUserId";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();

  let storedUserId = readUserId();

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
              <InfoBox note={note}/>
            </ListGroupItem>
          </LinkContainer>

          <UrlInfo note={note}/>

        </div>

    ) : (
      <div>
        <LinkContainer key="new" to="/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> {t("Add new note...")}
            </h4>
          </ListGroupItem>
        </LinkContainer>
        <LinkContainer key="new_onetime" to="/new-onetime">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> {t("Add onetime-readable note...")}
            </h4>
          </ListGroupItem>
        </LinkContainer>
      </div>
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
        <PageHeader>{t("Your encrypted notes:")}</PageHeader>
        { renderModal() }
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  function renderModal() {
    const handleRemoving = () => {

      storedUserId = createUserId();

      setNotes([]);

      handleClose();
    };

    return (
      <RemovingModal
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        handleRemoving={handleRemoving}
      />
    );
  }

  return (
    <div className="Home">
      {renderNotes()}
      {/*{isAuthenticated ? renderNotes() : renderLander()}*/}
    </div>
  );
}
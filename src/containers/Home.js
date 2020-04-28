import React, {useState, useEffect} from "react";
import {PageHeader, ListGroup, ListGroupItem, FormControl, Modal, Button} from "react-bootstrap";
import {useAppContext} from "../libs/contextLib";
import {onError} from "../libs/errorLib";
import "./Home.css";
import {API} from "aws-amplify";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import InfoBox from "../components/InfoBox";
import UrlInfo from "../components/UrlInfo";
import RemovingModal from "../components/RemovingModal";
import {readUserId, createUserId} from "../libs/readUserId";
import {useTranslation} from 'react-i18next';
import MyUserIdModal from "../components/MyUserIdModal";

export default function Home() {
  const {t, i18n} = useTranslation();

  let storedUserId = readUserId();

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showRemove, setShowRemove] = useState(false);
  const [showUserId, setShowUserId] = useState(false);
  const handleRemoveClose = () => setShowRemove(false);
  const handleRemoveShow = () => setShowRemove(true);
  const handleUserIdClose = () => setShowUserId(false);
  const handleUserIdShow = () => setShowUserId(true);


  useEffect(() => {
    async function onLoad() {
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {

        //todo see notfount message
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
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
      i !== 0 && note.content ? (
        <div>
          <LinkContainer key={note.noteId} to={`/${note.noteId}`}>
            <ListGroupItem header={note.noteId}>
              <InfoBox note={note}/>
            </ListGroupItem>
          </LinkContainer>

          <UrlInfo note={note}/>

        </div>
      ) : i !== 0 && !note.content ? (
          <div>
            <div>
              <ListGroupItem className="deleted-note" header={note.noteId + " - (" + t("Deleted or expired") + ")"}>
                <InfoBox note={note}/>
              </ListGroupItem>
            </div>

            <UrlInfo note={note}/>

          </div>
        ) :
        (
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

      handleRemoveClose();
    };

    return (
      <RemovingModal
        show={showRemove}
        handleShow={handleRemoveShow}
        handleClose={handleRemoveClose}
        handleRemoving={handleRemoving}
      />
    );
  }

  function renderMyUserId() {
    return (
      <MyUserIdModal
        show={showUserId}
        handleShow={handleUserIdShow}
        handleClose={handleUserIdClose}
        userId={readUserId()}
      />
    );
  }

  return (
    <div className="Home">
      {renderModal()}
      {renderMyUserId()}
      {renderNotes()}
      {/*{isAuthenticated ? renderNotes() : renderLander()}*/}
    </div>
  );
}
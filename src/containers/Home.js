import React, {useState, useEffect} from "react";
import {PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import {onError} from "../libs/errorLib";
import "./Home.css";
import {API} from "aws-amplify";
import {LinkContainer} from "react-router-bootstrap";
import InfoBox from "../components/InfoBox";
import UrlInfo from "../components/UrlInfo";
import RemovingModal from "../components/RemovingModal";
import {readUserId, createUserId} from "../libs/readUserId";
import {useTranslation} from 'react-i18next';
import MyUserIdModal from "../components/MyUserIdModal";

export default function Home() {
  const { t } = useTranslation();

  let storedUserId = readUserId();

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showRemove, setShowRemove] = useState(false);
  const handleRemoveClose = () => setShowRemove(false);
  const handleRemoveShow = () => setShowRemove(true);

  const [showUserId, setShowUserId] = useState(false);
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

    return API.get("privatebin", "/privatebin/notes", myInit);
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 && note.content ? (
        <div key={note.noteId}>
          <LinkContainer key={note.noteId} to={`/${note.noteId}`}>
            <ListGroupItem header={note.noteId}>
              <InfoBox note={note}/>
            </ListGroupItem>
          </LinkContainer>

          <UrlInfo note={note}/>

        </div>
      ) : i !== 0 && !note.content ? (
          <div key={note.noteId}>
            <div>
              <ListGroupItem key={note.noteId} className="deleted-note" header={note.noteId + " - (" + t("Deleted or expired") + ")"}>
                <InfoBox note={note}/>
              </ListGroupItem>
            </div>

            <UrlInfo note={note}/>

          </div>
        ) :
        (
          <div key="xyz">
            <LinkContainer key="new" to="/new">
              <ListGroupItem key="new">
                <h4>
                  <b>{"\uFF0B"}</b> {t("Add new note...")}
                </h4>
              </ListGroupItem>
            </LinkContainer>
            <LinkContainer key="new_onetime" to="/new-onetime">
              <ListGroupItem key="new_onetime">
                <h4>
                  <b>{"\uFF0B"}</b> {t("Add onetime-readable note...")}
                </h4>
              </ListGroupItem>
            </LinkContainer>
          </div>
        )
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>{t("Your encrypted notes")}:</PageHeader>
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
    </div>
  );
}
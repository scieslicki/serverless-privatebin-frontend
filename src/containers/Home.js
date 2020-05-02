import React, {useState, useEffect} from "react";
import {PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import {onError} from "../libs/errorLib";
import "./Home.css";
import {API} from "aws-amplify";
import {LinkContainer} from "react-router-bootstrap";
import InfoBox from "../components/InfoBox";
import UrlInfo from "../components/UrlInfo";
import RemovingModal from "../components/RemovingModal";
import {readUserId} from "../libs/readUserId";
import {useTranslation} from 'react-i18next';
import MyUserIdModal from "../components/MyUserIdModal";
import {useAppContext} from "../libs/contextLib";
import StartupInstructions from "../components/StartupInstructions";
// import { IOSView } from "react-device-detect";

export default function Home() {
  const { t } = useTranslation();

  const [notes, setNotes] = useState([]);
  const { isAuthenticated, storedUserId } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const [showRemove, setShowRemove] = useState(false);
  const handleRemoveClose = () => setShowRemove(false);
  const handleRemoveShow = () => setShowRemove(true);

  const [showUserId, setShowUserId] = useState(false);
  const handleUserIdClose = () => setShowUserId(false);
  const handleUserIdShow = () => setShowUserId(true);

  console.log(useAppContext());

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
  }, [isAuthenticated, storedUserId]);

  async function loadNotes() {
    let myInit = {
      body: {},
      headers: {
        "UserId": storedUserId,
      }
    }

    return await API.get("privatebin", "/privatebin/notes", myInit);
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
                  <b>{"\uFF0B"}</b> {t("Add new note")}...
                </h4>
              </ListGroupItem>
            </LinkContainer>
            <LinkContainer key="new_onetime" to="/new-onetime">
              <ListGroupItem key="new_onetime">
                <h4>
                  <b>{"\uFF0B"}</b> {t("Add onetime-readable note")}...
                </h4>
              </ListGroupItem>
            </LinkContainer>
              <LinkContainer key="drawed_note" to="/new-draw">
                <ListGroupItem key="drawed_note">
                  <h4>
                    <b>{"\uFF0B"}</b> {t("Add draw note")}...
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

        {/*<PlatformDepend*/}
        {/*  debug={true}*/}
        {/*  android={true}*/}
        {/*  desktop={true}*/}
        {/*  ios={true}*/}
        {/*  ios13={true}*/}
        {/*  ipad={true}*/}
        {/*  ipad13={true}*/}
        {/*  iphone={true}*/}
        {/*  iphone13={true}*/}
        {/*  macos={true}*/}
        {/*  mobile={true}*/}
        {/*  pc={true}*/}
        {/*  tablet={true}>*/}

        {/*</PlatformDepend>*/}
      </div>
    );
  }

  function renderModal() {
    const handleRemoving = () => {

      // storedUserId = createUserId();

      setNotes([]);

      handleRemoveClose();
    };

    return !isAuthenticated ? (
      <RemovingModal
        show={showRemove}
        handleShow={handleRemoveShow}
        handleClose={handleRemoveClose}
        handleRemoving={handleRemoving}
      />
    ) : (<></>);
  }

  function renderMyUserId() {
    return !isAuthenticated ? (
      <MyUserIdModal
        show={showUserId}
        handleShow={handleUserIdShow}
        handleClose={handleUserIdClose}
        userId={readUserId(isAuthenticated)}
      />
    ) : (<></>);
  }

  return (
    <div className="Home">
      {renderModal()}
      {renderMyUserId()}
      {renderNotes()}
      <StartupInstructions />
    </div>
  );
}
import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import {FormGroup, FormControl, ControlLabel, ListGroupItem} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";
import { s3Upload } from "../libs/awsLib";
import { decrypt } from "../Aes-256";
import {standarizePassword} from "../libs/password-lib";
import InfoBox from "../components/InfoBox";
import UrlInfo from "../components/UrlInfo";
import { readUserId } from "../libs/readUserId";
import WrongPasswordModal from "../components/WrongPasswordModal";

export default function Notes() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  let storedUserId = readUserId();

  const [userId, setUserId] = useState(storedUserId);

  const [note, setNote] = useState(null);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    function loadNote() {
      return API.get("privatebin", `/privatebin/${id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        // setContent(content);
        setContent('');
        setNote(note);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveNote(note) {
    return API.put("privatebin", `/privatebin/${id}`, {
      body: note
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveNote({
        content,
        attachment: attachment || note.attachment
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleDecrypt(event) {
    event.preventDefault();

    let content;

    try {
      content = decrypt(note.content, note.iv, note.tag, standarizePassword(password));

      setContent(content);
    } catch {
      setShow(true);
      // alert('Wrong password');
    }
  }

  function deleteNote() {
    return API.del("privatebin", `/privatebin/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Notes">
      {note && (
        // <form onSubmit={handleSubmit} onKeyPress={handleDecrypt}>
        <form onSubmit={handleDecrypt}>
          <FormGroup>
            <ListGroupItem header={note.noteId}>
              <InfoBox note={note} />
            </ListGroupItem>

          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel>Hasło</ControlLabel>
            <FormControl type="text"
             onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <LoaderButton
              block
              bsSize="large"
              bsStyle="warning"
              onClick={handleDecrypt}
            >
              Pokaż
            </LoaderButton>
          </FormGroup>
          <FormGroup controlId="content">
            <FormControl
              placeholder="Podaj hasło aby zobaczyć wiadomość po odszyfrowaniu..."
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          <div>
            <UrlInfo note={note} />
          </div>
          {/*<LoaderButton*/}
          {/*  block*/}
          {/*  type="submit"*/}
          {/*  bsSize="large"*/}
          {/*  bsStyle="primary"*/}
          {/*  isLoading={isLoading}*/}
          {/*  disabled={!validateForm()}*/}
          {/*>*/}
          {/*  Save*/}
          {/*</LoaderButton>*/}
          {/*<LoaderButton*/}
          {/*  block*/}
          {/*  bsSize="large"*/}
          {/*  bsStyle="danger"*/}
          {/*  onClick={handleDelete}*/}
          {/*  isLoading={isDeleting}*/}
          {/*>*/}
          {/*  Delete*/}
          {/*</LoaderButton>*/}
        </form>
      )}
      <WrongPasswordModal show={show} handleClose={handleClose} />

    </div>

  );
}
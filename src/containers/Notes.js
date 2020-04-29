import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import {FormGroup, FormControl, ControlLabel, ListGroupItem, Button} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";
import { s3Upload } from "../libs/awsLib";
import {decrypt, encrypt} from "../libs/Aes-256";
import {standarizePassword} from "../libs/password-lib";
import InfoBox from "../components/InfoBox";
import UrlInfo from "../components/UrlInfo";
import { readUserId } from "../libs/readUserId";
import WrongPasswordModal from "../components/WrongPasswordModal";
import { useTranslation } from 'react-i18next';
import dedent from 'dedent';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';

import {typeOptions} from "../data/type-options";
import {ttlOptions} from "../data/ttl-options";
import {saveNote as saveToStoreNote} from "../libs/store-note";

const ttlIndex = 4;
const typeIndex = 0;

export default function Notes() {
  const { id, pass } = useParams();
  const history = useHistory();
  const { t, i18n } = useTranslation();

  let storedUserId = readUserId();

  const [userId, setUserId] = useState(storedUserId);

  const [note, setNote] = useState(null);
  const [password, setPassword] = useState(pass);
  const [content, setContent] = useState({ code:"" } );
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [show, setShow] = useState(false);
  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [telomer, setTelomer] = useState(3);
  const [ttl, setTtl] = useState(ttlOptions[ttlIndex].value);  //w minutach
  const [type, setType] = useState(typeOptions[typeIndex].value);
  const handleClose = () => setShow(false);

  useEffect(() => {
    function loadNote() {
      return API.get("privatebin", `/privatebin/${id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        // const { content, attachment } = note;
        const { content } = note;

        setContent({code:''});
        setNote(note);
        setType(note.type);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0;
  }

  function createCommonNote(note, withPassword = false) {
    const result = {
      userId: storedUserId,
      type: note.type,
      ttl: parseInt(note.ttl),
      telomer: parseInt(note.telomer),
      content: content.code,
    };

    if (withPassword) {
      result.password = password;
    }

    return result;
  }

  async function gotoResponse() {
    await saveToStoreNote(createCommonNote(note, true));

    history.push("/response");
  }


  function saveNote(note) {
    return API.put("privatebin", `/privatebin/${id}`, {
      body: note
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { ciphertext, iv, tag } = encrypt(content, standarizePassword(password));
      note.content = ciphertext;
      note.iv = iv;
      note.tag = tag;

      await saveNote(note);
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
      content = decrypt(
        note.content,
        note.iv,
        note.tag,
        await standarizePassword(note.userId, password ? password : ''),
        note.compression
      );

      setContent({code: content});

      setPasswordDisabled(true);
    } catch (e) {
      console.log(e);
      setShow(true);
    }
  }

  function deleteNote() {
    return API.del("privatebin", `/privatebin/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      t("Are you sure you want to delete this note?")
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

  function highlightByType(code) {
    if (type) {
      const splitted = type.split('/');

      if (splitted[0] === 'text') {
        let shortType = splitted[1];

        if (shortType === 'plain') {
          shortType = 'html';
        }

        return highlight(code, languages[shortType]);
      }

      return highlight(code, languages.html);
    }

    return highlight(code, languages.html);
  }

  return (
    <div className="Notes">
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <ListGroupItem header={note.noteId}>
              <InfoBox note={note} />
            </ListGroupItem>

          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel>{t("Password")}</ControlLabel>
            <FormControl type="text"
                         readOnly={passwordDisabled}
                         value={password}
                         onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <LoaderButton
              block
              bsSize="large"
              bsStyle="warning"
              onClick={handleDecrypt}
              disabled={passwordDisabled}
            >
              {t("Decrypt")}
            </LoaderButton>
          </FormGroup>
          <FormGroup controlId="content">
            <Editor
              value={content.code}
              onValueChange={code => setContent({ code })}
              highlight={code => highlightByType(code)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                // fontSize: 12,
              }}
              className="container__editor"
            />

            {/*<FormControl*/}
            {/*  placeholder={t("Enter your password to see the message after decryption...")}*/}
            {/*  value={content}*/}
            {/*  componentClass="textarea"*/}
            {/*  onChange={e => setContent(e.target.value)}*/}
            {/*/>*/}
          </FormGroup>
          <div>
            <UrlInfo note={note} url={window.location.href}/>
          </div>
          <div>
            <Button
              block
              bsSize="large"
              bsStyle="success"
              onClick={gotoResponse}
              disabled={!passwordDisabled}
            >
              {t("Reply")}
            </Button>
          </div>
            {/*{ storedUserId == note.userId ?*/}
            {/*(*/}
            {/*  <div>*/}
            {/*    <LoaderButton*/}
            {/*      block*/}
            {/*      type="submit"*/}
            {/*      bsSize="large"*/}
            {/*      bsStyle="primary"*/}
            {/*      isLoading={isLoading}*/}
            {/*      disabled={!validateForm()}*/}
            {/*    >*/}
            {/*      {t("Save")}*/}
           {/*     </LoaderButton>*/}
           {/*   </div> )*/}
           {/*: <div></div> }*/}
          <div>
            <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            {t("Destroy now!")}
          </LoaderButton>
          </div>
        </form>
      )}
      <WrongPasswordModal show={show} handleClose={handleClose} />

    </div>
  );
}
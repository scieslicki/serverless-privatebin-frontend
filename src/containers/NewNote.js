import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {FormGroup, FormControl, ControlLabel, MenuItem} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import PasswordMask from 'react-password-mask';
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";
import { encrypt } from "../Aes-256";
import {standarizePassword} from "../libs/password-lib";
import Select from 'react-select';
import {ttlOptions} from "../data/ttl";
import { readUserId } from "../libs/readUserId";

const ttlIndex = 4;

export default function NewNote() {
  // const file = useRef(null);
  const history = useHistory();

  let storedUserId = readUserId();

  const [userId, setUserId] = useState(storedUserId);

  const [telomer, setTelomer] = useState(3);
  const [ttl, setTtl] = useState(ttlOptions[ttlIndex].value);  //w minutach
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(
    //     `Please pick a file smaller than ${
    //       config.MAX_ATTACHMENT_SIZE / 1000000
    //     } MB.`
    //   );
    //   return;
    // }

    setIsLoading(true);

    try {
      const { ciphertext, iv, tag } = encrypt(content, standarizePassword(password));

      await createNote({
        userId: storedUserId,
        type: 'text',
        ttl: parseInt(ttl),
        telomer: parseInt(telomer),
        content: ciphertext,
        iv,
        tag
      }
      );
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post("privatebin", "/privatebin", {
      body: note
    });
  }

  // const CustomOption = ({ innerProps, isDisabled }) =>
  //   innerProps.options = ttlOptions
  //   !isDisabled ? (
  //     <div {...innerProps}>{/* your component internals */}</div>
  //   ) : null;

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <ControlLabel>Maksymalna ilość wyświetleń</ControlLabel>
          <FormControl controlId="telomer"
                       type="number"
                       value={telomer}
                       onChange={e => setTelomer(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="ttl">
          <ControlLabel>Data ważności</ControlLabel>
          <Select
            options={ttlOptions}
            defaultValue={ttlOptions[ttlIndex]}
            onChange={e => setTtl(e.value)}
             />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Data ważności (w minutach)</ControlLabel>
          <FormControl controlId="ttl"
                       type="number"
                       value={ttl}
                       onChange={e => setTtl(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="password">
          <ControlLabel>Hasło</ControlLabel>
          <PasswordMask controlId="password"
            value={password}
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
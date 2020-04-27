import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {Image, Nav, Navbar, NavItem} from "react-bootstrap";
import './App.css';
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";
import {readUserId} from "./libs/readUserId";
import { useTranslation } from 'react-i18next';

function App() {
  const history = useHistory();

  const { t, i18n } = useTranslation();

  let storedUserId = readUserId();

  const [userId, setUserId] = useState(storedUserId);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
  //   setUserId(uuid.v4());
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand href="/">
            <Link to="/">
              <img
                src="/img/szotki-napis.png"
                className="d-inline-block align-top logo"
                alt="Szotki" />{' '}- {t("encrypted notes")}...
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/new">
              <NavItem>{t("New")}...</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>{t("About")}</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ErrorBoundary>
        {/*<AppContext.Provider*/}
        {/*  value={{ isAuthenticated, userHasAuthenticated }}*/}
        {/*>*/}
          <Routes />
        {/*</AppContext.Provider>*/}
      </ErrorBoundary>
    </div>
  )
}

export default App;
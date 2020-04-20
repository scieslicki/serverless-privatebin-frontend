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

function App() {
  const history = useHistory();

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
                alt="Szotki" />{' '}- szyfrowane notki...
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/new">
              <NavItem>Dodaj...</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
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
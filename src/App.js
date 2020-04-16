import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import './App.css';
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";
import * as uuid from "uuid";

function App() {
  const history = useHistory();

  const [userId, setUserId] = useState('');

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    setUserId(uuid.v4());
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Serverless Privatebin</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
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
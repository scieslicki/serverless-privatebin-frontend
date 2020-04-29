import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import './App.css';
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import ErrorBoundary from "./components/ErrorBoundary";
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
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
          <Routes />
      </ErrorBoundary>
    </div>
  )
}

export default App;
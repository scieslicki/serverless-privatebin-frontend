import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import SetUser from "./containers/SetUser";
import Settings from "./containers/Settings";

import Login from "./containers/Auth/Login";
import Signup from "./containers/Auth/Signup";
import ForgotPassword from "./containers/Auth/ForgotPassword";

import NewNote from "./containers/Notes/NewNote";
import NewNoteOnetime from "./containers/Notes/NewNoteOnetime";
import Notes from "./containers/Notes/Notes";
import QuickNote from "./containers/Notes/QuickNote";
import QuickNoteWithPassword from "./containers/Notes/QuickNoteWithPassword";
import Response from "./containers/Notes/Response";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NewDrawNote from "./containers/Notes/NewDrawNote";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/reset">
        <ForgotPassword />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>
      <Route exact path="/quick/:password/:message">
        <QuickNoteWithPassword />
      </Route>
      <Route exact path="/quick/:msg">
        <QuickNote />
      </Route>
      <Route exact path="/user/:id">
        <SetUser />
      </Route>
      <Route exact path="/new">
        <NewNote />
      </Route>
      <Route exact path="/new-draw">
        <NewDrawNote />
      </Route>
      <Route exact path="/new-onetime">
        <NewNoteOnetime />
      </Route>
      <Route exact path="/response">
        <Response />
      </Route>
      <Route exact path="/:id/:pass">
        <Notes />
      </Route>
      <Route exact path="/:id">
        <Notes />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
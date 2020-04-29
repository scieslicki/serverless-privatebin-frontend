import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import NewNote from "./containers/NewNote";
import NewNoteOnetime from "./containers/NewNoteOnetime";
import Notes from "./containers/Notes";
import SetUser from "./containers/SetUser";
import QuickNote from "./containers/QuickNote";
import QuickNoteWithPassword from "./containers/QuickNoteWithPassword";
import Response from "./containers/Response";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Settings from "./containers/Settings";

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
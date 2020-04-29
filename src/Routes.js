import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import NewNote from "./containers/NewNote";
import NewNoteOnetime from "./containers/NewNoteOnetime";
import Notes from "./containers/Notes";
import SetUser from "./containers/SetUser";
import QuickNote from "./containers/QuickNote";
import QuickNoteWithPassword from "./containers/QuickNoteWithPassword";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
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
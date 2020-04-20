import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import NewNote from "./containers/NewNote";
import NewNoteOnetime from "./containers/NewNoteOnetime";
import Notes from "./containers/Notes";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
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
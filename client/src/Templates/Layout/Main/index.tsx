import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ComicsForm, ComicsList, ComicsItem } from "Pages";

export function Main() {
  return (
    <main className="my-3 px-10 w-full h-full">
      <Switch>
        <Route path="/add-comics" exact component={ComicsForm}></Route>
        <Route path="/comics/:id" exact component={ComicsItem}></Route>
        <Route path="/comics" exact component={ComicsList}></Route>
        <Redirect from="*" exact to="/comics"></Redirect>
      </Switch>
    </main>
  );
}

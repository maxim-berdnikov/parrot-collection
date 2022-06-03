import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {AddComics, ComicsList } from "../../Pages";

export function Main() {
  return (
    <main className="my-3 px-10 w-full h-full">
      <Switch>
        <Route path="/add-comics" exact component={AddComics}></Route>
        <Route path="/comics" exact component={ComicsList}></Route>
        <Redirect from="*" exact to="/comics"></Redirect>
      </Switch>
    </main>
  );
}

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ComicsForm } from "../../../Pages/ComicsForm/index";
import {ComicsList} from "../../../Pages/ComicsList/index"

export function Main() {
  return (
    <main className="my-3 px-10 w-full h-full">
      <Switch>
        <Route path="/add-comics" exact component={ComicsForm}></Route>
        <Route path="/comics" exact component={ComicsList}></Route>
        <Redirect from="*" exact to="/comics"></Redirect>
      </Switch>
    </main>
  );
}

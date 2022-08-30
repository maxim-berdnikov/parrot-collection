import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ComicsForm, ComicsList, ComicsItem, NotFound } from "Pages";

export function Main() {
  const location = useLocation();

  console.log({ location });
  return (
    <main className="my-3 px-10 w-full h-full">
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/parrot-collection" element={<ComicsList />}></Route>
        <Route path="/parrot-collection/add-comics" element={<ComicsForm />}></Route>
        <Route path="/parrot-collection/comics" element={<ComicsList />}></Route>
        <Route path="parrot-collection/comics/:_id" element={<ComicsItem />}></Route>
      </Routes>
    </main>
  );
}

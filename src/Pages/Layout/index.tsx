import React from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="flex flex-col items-center justify-between h-screen text-center">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

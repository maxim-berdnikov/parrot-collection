import React from "react";
import "./style.css";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="grid h-screen text-center wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

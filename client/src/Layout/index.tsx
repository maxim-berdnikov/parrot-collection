import React from "react";
import "./style.css";
import { Header } from "./Components/Header";
import { Main } from "./Components/Main";
import { Footer } from "./Components/Footer";

export function Layout() {
  return (
    <div className="grid h-screen text-center wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

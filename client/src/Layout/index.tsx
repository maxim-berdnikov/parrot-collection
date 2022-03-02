import React from "react";
import "./style.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

export function Layout() {
  return (
    <div className="grid h-screen text-center wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

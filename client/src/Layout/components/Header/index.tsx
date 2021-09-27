import React from "react";
import logo from "../../../assets/logo.svg";

export function Header() {
  console.log(logo);

  return (
    <header className="p-0.5 w-full bg-yellow-500">
      <img
        src={logo}
        alt="Parrot"
        width="60px"
        height="auto"
        className="mx-auto"
      />
    </header>
  );
}

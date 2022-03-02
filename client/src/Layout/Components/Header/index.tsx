import React from "react";
import logo from "../../../Assets/logo.svg";

export function Header() {
  const lineClass = "px-2 inline-block underline underline-offset-2";

  return (
    <header className="p-0.5 w-full bg-yellow-500">
      <img
        src={logo}
        alt="Parrot"
        width="60px"
        height="auto"
        className="mx-auto"
      />
      <a className={lineClass} href="/parrot-collection/#/comics">
        Главная
      </a>
      <a className={lineClass} href="/parrot-collection/#/add-comics">
        Добавить комикс
      </a>
    </header>
  );
}

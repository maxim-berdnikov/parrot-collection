import React from "react";
import logo from "Assets/logo.svg";
import { ROUTES } from "Helpers";

export const Header = (): JSX.Element => {
	const lineClass = "px-2 inline-block underline underline-offset-4";

	return (
		<header className="p-0.5 w-full bg-yellow-500">
			<img
				src={logo}
				alt="Parrot"
				width="60px"
				height="auto"
				className="mx-auto"
			/>
			<a className={lineClass} href={ROUTES.comicsList}>
				Главная
			</a>
			<a className={lineClass} href={ROUTES.comicsForm}>
				Добавить комикс
			</a>
		</header>
	);
};

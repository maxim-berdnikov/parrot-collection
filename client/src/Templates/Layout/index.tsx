import React from "react";
import "./style.scss";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

export const Layout = (): JSX.Element => {
	return (
		<div className="grid h-screen text-center wrapper">
			<Header />
			<Main />
			<Footer />
		</div>
	);
};

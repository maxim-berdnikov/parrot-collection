import React from "react";
import { Route, Routes } from "react-router-dom";
import { ComicsForm, ComicsList, ComicsItem, NotFound } from "Pages";
import { ADMIN_MODE } from "Helpers";

export const Main = (): JSX.Element => {
	return (
		<main className="my-3 px-5 w-full h-full">
			<Routes>
				<Route path="*" element={<NotFound />}></Route>
				<Route path="/" element={<ComicsList />}></Route>
				<Route path="/comics" element={<ComicsList />}></Route>
				<Route path="/comics/:_id" element={<ComicsItem />}></Route>
				{ADMIN_MODE && (
					<Route path="/add-comics" element={<ComicsForm />}></Route>
				)}
			</Routes>
		</main>
	);
};

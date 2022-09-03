import React from "react";
import { Route, Routes } from "react-router-dom";
import { ComicsForm, ComicsList, ComicsItem, NotFound, LoginPage } from "Pages";
import { useAppSelector } from "Store/hooks";

export const Main = (): JSX.Element => {
	const { adminMode } = useAppSelector((state) => state.user);
	return (
		<main className="my-3 px-5 w-full h-full">
			<Routes>
				<Route path="*" element={<NotFound />}></Route>
				<Route path="/" element={<ComicsList />}></Route>
				<Route path="/comics" element={<ComicsList />}></Route>
				<Route path="/comics/:_id" element={<ComicsItem />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				{adminMode && (
					<Route path="/add-comics" element={<ComicsForm />}></Route>
				)}
			</Routes>
		</main>
	);
};

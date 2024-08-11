import React from "react";

export const Footer = (): JSX.Element => {
	const year = new Date().getFullYear();
	return (
		<footer className="p-3 w-full bg-yellow-500 text-white font-bold">
			@ {year} Parrot Collection
		</footer>
	);
};

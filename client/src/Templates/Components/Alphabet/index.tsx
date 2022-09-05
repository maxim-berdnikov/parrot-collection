import React, { MouseEvent } from "react";
import clsx from "classnames";
import "./style.scss";

type AlphabetProps = {
	alphabet: string[];
	currentLetter: string;
	handleChooseSection: (letter: string) => void;
};

export const Alphabet = ({
	alphabet,
	currentLetter,
	handleChooseSection,
}: AlphabetProps): JSX.Element => {
	const alphabetClass = "alphabet mb-2 flex justify-center flex-wrap";
	const letterClass =
		"alphabet__letter mx-px px-1 h-5 leading-4 cursor-pointer border-transparent border-solid border border-transparent uppercase hover:border-yellow-500";
	const activeLetterClass = "border-yellow-500";

	const handleClick = (event: MouseEvent) =>
		handleChooseSection(event.currentTarget.id);

	return (
		<div className={alphabetClass}>
			{alphabet.map((letter) => (
				<p
					key={letter}
					className={clsx(
						letterClass,
						currentLetter === letter && activeLetterClass
					)}
					id={letter}
					onClick={handleClick}
				>
					{letter}
				</p>
			))}
		</div>
	);
};

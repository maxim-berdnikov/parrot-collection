import { Alphabet } from "Components";
import React, { useEffect, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { ComicsBlock } from "../../Components/ComicsBlock";
import { Loader } from "../../Components/Loader";
import { ComicsProps } from "Types";
import { useGetComicsList } from "Hooks";
import { ENGLISH_ALPHABET, RUSSIAN_ALPHABET, sorting } from "Helpers";

import "./style.scss";

export function ComicsList(): JSX.Element {
	const {
		isLoading: isListLoading,
		isFetching: isListFetching,
		error: listError,
		data: comicsList,
	} = useGetComicsList();

	const [books, setBooks] = useState<ComicsProps[]>([]);
	const [library, setLibrary] = useState<ComicsProps[]>([]);
	const [isBooksLoading, setIsBooksLoading] = useState(false);
	const [currentLetter, setCurrentLetter] = useState("");
	const [searchValue, setSearchValue] = useState("");

	const handleChangeSearchValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchValue(event.target.value);
		setCurrentLetter("");
		const val = event.target.value.trim();
		const filteredItems = library.filter((book) =>
			book.title
				.toLowerCase()
				.replace(".", "")
				.replace(",", "")
				.replace("-", " ")
				.replace("(", "")
				.replace(")", "")
				.includes(val.toLowerCase().replace(".", "").replace("-", " "))
		);
		setBooks(filteredItems);
	};

	const handleChooseSection = (letter: string) => {
		setSearchValue("");
		setCurrentLetter(letter);

		const booksByLetter = library.filter(
			(book) => book.title.substring(0, 1).toLowerCase() === letter
		);
		setBooks(booksByLetter);
	};

	const handleClickAll = () => {
		setBooks(library);
		setCurrentLetter("");
	};

	const handleFilter = () => {
		setBooks(library.filter((book) => !book.isRead));
		setCurrentLetter("");
	};

	useEffect(() => {
		if (comicsList) {
			setIsBooksLoading(true);

			const newCollection = sorting(comicsList) as ComicsProps[];

			setBooks(newCollection);
			setLibrary(newCollection);
			setIsBooksLoading(false);
		}
	}, [comicsList]);

	return (
		<>
			{comicsList && (
				<>
					<Alphabet
						alphabet={RUSSIAN_ALPHABET}
						currentLetter={currentLetter}
						handleChooseSection={handleChooseSection}
					/>
					<Alphabet
						alphabet={ENGLISH_ALPHABET}
						currentLetter={currentLetter}
						handleChooseSection={handleChooseSection}
					/>
					<p
						className="mx-auto w-20 cursor-pointer border-transparent border-solid border border-transparent hover:border-yellow-500"
						onClick={handleClickAll}
					>
						Все
					</p>
					<p
						className="mx-auto w-32 cursor-pointer border-transparent border-solid border border-transparent hover:border-yellow-500"
						onClick={handleFilter}
					>
						Непрочитанные
					</p>
					<div className="search mt-5 mb-8 flex justify-center items-center gap-2.5">
						<input
							type="text"
							placeholder="Название комикса"
							value={searchValue}
							className="input px-2.5 block h-7 max-w-xs w-full border border-yellow-300 rounded-md outline-none focus:border-pink-300"
							onChange={handleChangeSearchValue}
						/>
						<div className="counter w-14 border border-yellow-300 rounded-md">
							{books.length}
						</div>
					</div>
					<div className="list m-auto flex justify-center flex-wrap ">
						{books.length > 0 ? (
							books.map((comics) => (
								<ComicsBlock key={comics._id} {...comics} />
							))
						) : (
							<p>Ничего не найдено :(</p>
						)}
					</div>
				</>
			)}
			{(isListLoading || isBooksLoading || isListFetching) && <Loader />}
			{listError && <p>Ничего не найдено :(</p>}
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

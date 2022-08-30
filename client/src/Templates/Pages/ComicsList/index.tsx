import React, { useEffect, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { ComicsBlock } from "../../Components/ComicsBlock";
import { Loader } from "../../Components/Loader";
import { ComicsProps } from "Types";
import { useGetComicsList } from "Hooks";
import "./style.scss";
import { ENGLISH_ALPHABET, RUSSIAN_ALPHABET } from "Helpers";

export function ComicsList(): JSX.Element {
  const {
    isLoading: isListLoading,
    error: listError,
    data: comicsList,
  } = useGetComicsList();

  const [books, setBooks] = useState<ComicsProps[]>([]);
  const [library, setLibrary] = useState<ComicsProps[]>([]);
  const [isBooksLoading, setIsBooksLoading] = useState(false);

  const letterClass = "alphabet__letter w-7 h-7";
  const alphabetClass = "alphabet__letter"

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    if (comicsList) {
      setIsBooksLoading(true);
      const newCollection = comicsList.sort(function (a, b) {
        let res = 0;
        a.title > b.title ? (res = 1) : (res = -1);
        return res;
      });

      setBooks(newCollection);
      setLibrary(newCollection);
      setIsBooksLoading(false);
    }
  }, [comicsList]);

  return (
    <>
      {comicsList && (
        <>
          <div className="alphabet">
            {RUSSIAN_ALPHABET.map((letter) => (
              <p className={letterClass}>{letter}</p>
            ))}
          </div>
          <div className="alphabet">
            {ENGLISH_ALPHABET.map((letter) => (
              <p className={letterClass}>{letter}</p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Название комикса"
            className="input mt-5 mx-auto mb-8 px-2.5 block h-7 max-w-xs w-full border border-yellow-300 rounded-md outline-none focus:border-pink-300"
            onChange={handleChange}
          />
          <div className="list m-auto flex justify-center flex-wrap">
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
      {(isListLoading || isBooksLoading) && <Loader />}
      {listError && <p>Ничего не найдено :(</p>}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./style.scss";
import { ComicsItem } from "../ComicsItem/index";

interface Comics {
  id: number;
  title: string;
  authors: string[];
  description: string;
  characters: string[];
  cover: string;
  edition: string;
  year: string;
  original: string;
  owned: string[];
  sell: string[];
  wishlist: string[];
}

const queryClient = new QueryClient();
export function ComicsList() {
  return (
    <QueryClientProvider client={queryClient}>
      <ComicsListGet />
    </QueryClientProvider>
  );
}

function ComicsListGet() {
  const getAllComics = async () => {
    const { data } = await axios.get("/api/comics/list");
    return data;
  };

  const { isLoading, error, data, isFetching } = useQuery(
    "comics",
    getAllComics
  );

  return (
    <>
      {data ? <RenderComicsList {...data} /> : <p>Loading</p>}

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

function RenderComicsList(collection: Comics[]) {
  const newArr = Object.values(collection).sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const [books, setBooks] = useState(newArr);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value.trim();
    const filteredItems = newArr.filter((book) =>
      book.title
        .toLowerCase()
        .replace(".", "")
        .includes(val.toLowerCase().replace(".", ""))
    );
    setBooks(filteredItems);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Название комикса"
        className="input mt-5 mx-auto px-2.5 block h-7 max-w-xs w-full border border-yellow-300 rounded-md outline-none focus:border-pink-300"
        onChange={handleChange}
      />
      <div className="list m-auto flex justify-center flex-wrap">
        {books.length > 0 ? (
          books.map((comics) => <ComicsItem key={comics.id} {...comics} />)
        ) : (
          <p>Ничего не найдено :(</p>
        )}
      </div>
    </>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./style.scss";
import { ComicsItem } from "../ComicsItem";

interface Comics {
  _id: number;
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
    const { data } = await axios.get(
      `${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/list`
    );
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
  const newCollection = Object.values(collection);

  const newArr = newCollection.sort(function (a, b) {
    let res = 0;
    a.title > b.title ? (res = 1) : (res = -1);
    return res;
  });

  // const newArr = newCollection.sort((a, b) =>
  //   a.title.localeCompare(b.title)
  // );

  const [books, setBooks] = useState(newArr);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value.trim();
    const filteredItems = newArr.filter((book) =>
      book.title
        .toLowerCase()
        .replace(".", "")
        .replace("-", " ")
        .includes(val.toLowerCase().replace(".", "").replace("-", " "))
    );
    setBooks(filteredItems);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Название комикса"
        className="input mt-5 mx-auto mb-8 px-2.5 block h-7 max-w-xs w-full border border-yellow-300 rounded-md outline-none focus:border-pink-300"
        onChange={handleChange}
      />
      <div className="list m-auto flex justify-center flex-wrap">
        {books.length > 0 ? (
          books.map((comics) => <ComicsItem key={comics._id} {...comics} />)
        ) : (
          <p>Ничего не найдено :(</p>
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import './style.scss';

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
};

function ComicsItem(comics: Comics) {
  const currentUser = "first";
  const [collection, setCollection] = useState(false);
  const [sell, setSell] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleClick = (type: "collection" | "sell" | "wishlist") => {
    switch (type) {
      case "collection":
        if (collection === false && wishlist === true) {
          setWishlist(false);
        }
        setCollection(!collection);
        break;
      case "sell":
        setSell(!sell);
        break;
      case "wishlist":
        setWishlist(!wishlist);
        break;
    }
  };

  useEffect(() => {
    setCollection(comics.owned.includes(currentUser));
    setSell(comics.sell.includes(currentUser));
    setWishlist(comics.wishlist.includes(currentUser));
  }, [comics]);

  return (
    <div className="book grid">
      {comics.cover ? (
        <img
          className="book__img mx-auto mb-2 hover:cursor-pointer"
          src={comics.cover}
          alt={comics.title}
        />
      ) : (
        <div className="book__img book__img--mock mx-auto mb-2 hover:cursor-pointer"></div>
      )}
      <p className="book__title place-self-center">{comics.title}</p>
      <div className="book__buttons mt-3 mx-auto flex justify-between">
        <div
          className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
          data-type="collection"
          data-status={collection}
          onClick={() => handleClick("collection")}
        ></div>
        <div
          className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
          data-type="sell"
          data-status={sell}
          onClick={() => handleClick("sell")}
        ></div>
        <div
          className="book__buttons-item bg-center bg-cover bg-no-repeat transition"
          data-type="wishlist"
          data-status={wishlist}
          onClick={() => handleClick("wishlist")}
        ></div>
      </div>
    </div>
  );
}

export function ComicsList() {
  const comicsCollection = [
    {
      id: 1,
      title: "Веном. Том 1",
      authors: ["Кален Банн", "Джейсон Аарон"],
      description: "Веном против Карнажа",
      characters: ["Веном", "Карнаж"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["first", "second", "third"],
      sell: ["first"],
      wishlist: [],
    },
    {
      id: 2,
      title: "Веном. Том 3",
      authors: ["Кален Банн", "Джейсон Аарон"],
      description: "Веном против Карнажа",
      characters: ["Веном", "Карнаж"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["second", "third"],
      sell: [],
      wishlist: ["first"],
    },
    {
      id: 3,
      title: "Веном. Том 2",
      authors: ["Кален Банн", "Джейсон Аарон"],
      description: "Веном против Карнажа",
      characters: ["Веном", "Карнаж"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["first", "second"],
      sell: [],
      wishlist: [],
    },
    {
      id: 4,
      title: "Веном. Том 4",
      authors: ["Кален Банн", "Джейсон Аарон"],
      description: "Веном против Карнажа",
      characters: ["Веном", "Карнаж"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["first", "third"],
      sell: [],
      wishlist: [],
    },
    {
      id: 5,
      title: "Тор. Том 1",
      authors: ["Джейсон Аарон"],
      description: "Тор пришел",
      characters: ["Тор"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["first"],
      sell: ["first"],
      wishlist: [],
    },
    {
      id: 6,
      title: "Тор. Том 2",
      authors: ["Джейсон Аарон"],
      description: "Тор пришел",
      characters: ["Тор"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["second", "third"],
      sell: [],
      wishlist: ["first"],
    },
    {
      id: 7,
      title: "Тор. Плоды осады",
      authors: ["Джейсон Аарон"],
      description: "Тор ушел",
      characters: ["Тор", "Тор (Джейн Фостер)"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["first", "third"],
      sell: [],
      wishlist: [],
    },
    {
      id: 8,
      title: "Дедпул против Дракулы",
      authors: ["Джейсон Аарон"],
      description: "Тор ушел",
      characters: ["Тор", "Тор (Джейн Фостер)"],
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369453733l/6953508.jpg",
      edition: "ТПБ",
      year: "2020",
      original: "2010",
      owned: ["first", "second"],
      sell: [],
      wishlist: [],
    },
  ];

  const newArr = comicsCollection.sort((a, b) =>
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

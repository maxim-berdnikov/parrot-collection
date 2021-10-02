import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useMutation } from 'react-query';

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
  };

export function ComicsItem(comics: Comics) {
    const currentUser = "m.radik25@gmail.com";
    const [collection, setCollection] = useState(false);
    const [sell, setSell] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const mutation = useMutation((comicsItem: Comics) => axios.delete(`/comics/${comicsItem._id}`, {}))

  
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
  
    // useEffect(() => {
    //   setCollection(comics.owned.includes(currentUser));
    //   setSell(comics.sell.includes(currentUser));
    //   setWishlist(comics.wishlist.includes(currentUser));
    // }, [comics]);
  
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
        <p className="book__title place-self-center text-sm">{comics.title}</p>
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
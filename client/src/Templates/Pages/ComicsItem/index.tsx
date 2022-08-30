import axios from "axios";
import React from "react";
import { Loader } from "Components/Loader";
import { useParams } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ComicsProps } from "Types";
import { useNavigate } from "react-router-dom";
import { useGetComicsItem } from "Hooks";
import "./style.scss";

export const ComicsItem = () => {
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();

  const VISIBLE_FIELDS = [
    "title",
    "authors",
    "artists",
    "description",
    "characters",
    "genres",
    "edition",
    "includes",
    "volume",
    "book",
    "year",
    "publisher",
    "original",
    "original_publisher",
  ];

  const deleteComicsItem = async () =>
    await axios
      .get<string>(
        `${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/${_id}/delete`,
        { params: { _id } }
      )
      .then((response) =>
        response.data === "Удалено" ? navigate("/parrot-collection/comics") : console.log({ response })
      );
  const handleDeleteComics = () => {
    alert("Вы уверены?");
    deleteComicsItem();
  };

  const { isLoading, error, data } = useGetComicsItem(_id);

  error && console.log({ error });

  return (
    <>
      {error && <p>При загрузке данных произошла ошибка</p>}
      {isLoading && <Loader />}
      {data && (
        <div>
          {data.cover ? (
            <img
              className="book__img mx-auto mb-2 hover:cursor-pointer"
              src={data.cover}
              alt={data.title}
            />
          ) : (
            <div className="book__img book__img--mock mx-auto mb-2 hover:cursor-pointer"></div>
          )}
          {Object.keys(data)
            .filter(
              (key) =>
                VISIBLE_FIELDS.includes(key) && data[key as keyof ComicsProps]
            )
            .map((key) => {
              const currentItem = data[key as keyof ComicsProps];

              return Array.isArray(currentItem) ? (
                <div key={key} className="info-list">
                  {currentItem.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ) : (
                <p key={key}>{currentItem}</p>
              );
            })}

          {/* <button
            className="mt-4 mx-auto block w-48 h-8 bg-yellow-500"
            onClick={handleDeleteComics}
          >
            Удалить
          </button> */}
        </div>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

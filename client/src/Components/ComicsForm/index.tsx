import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function ComicsForm() {
  const { register, handleSubmit, reset } = useForm();
  const formClasses = "flex flex-col max-w-xs mt-2 mx-auto";
  const fieldClasses =
    "mb-2 px-2 border border-yellow-400	rounded focus:outline-none focus:border-pink-300";
  const inputClasses = `${fieldClasses} h-10 appearance-none`;
  const textareaClasses = `${fieldClasses} pt-1 h-20 resize-none`;
  const buttonClasses =
    "h-10 border border-transparent rounded bg-yellow-400 font-bold text-white";

  type Comics = {
    title: string;
    authors: string;
    description: string;
    characters: string;
    genres: string;
    edition: string;
    includes: string;
    volume: string;
    book: number;
    year: number;
    publisher: string;
    cover: any;
    original: number;
    original_publisher: string;
  };

  // const date1 = Date.now();
  // const date2 = Date.now() + 1;
  //   const date3 = Date.now() + 2;

  //   const activities = [
  //     { title: "Hiking", date: date1 },
  //     { title: "Shopping", date: date3 },
  //     { title: "Trekking", date: date2 },
  //   ];

  //   const sortedActivities = activities.sort((a, b) => b.date - a.date);

  //   console.log(sortedActivities);

  const onSubmit = (data: Comics) => {
    const authors = data.authors.split(", ");
    const characters = data.characters.split(", ");
    const genres = data.genres.split(", ");
    let cover: string | ArrayBuffer | null = "";
    if (data.cover[0]) {
      console.log(data.cover[0].size);

      if (data.cover[0].size > 100000) {
        console.log("big file");
      } else {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          cover = e.target!.result;

          const newComics = {
            title: data.title,
            authors,
            description: data.description,
            characters,
            cover,
            genres,
            edition: data.edition,
            year: data.year,
            includes: data.includes,
            volume: data.volume,
            book: data.book,
            publisher: data.publisher,
            original: data.original,
            original_publisher: data.original_publisher,
          };

          console.log(newComics);
          axios.post("/api/comics/add", newComics);
        });
        FR.readAsDataURL(data.cover[0]);
      }
    }

    // reset();
  };

  return (
    <form
      className={formClasses}
      name="add-comics"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={inputClasses}
        type="text"
        placeholder="Название"
        {...register("title")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Автор/авторы"
        {...register("authors")}
      />
      <textarea
        className={textareaClasses}
        placeholder="Описание"
        {...register("description")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Персонаж/персонажи"
        {...register("characters")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Жанр/жанры"
        {...register("genres")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Тип издания"
        {...register("edition")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Включает выпуски"
        {...register("includes")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Том (серия), например, Venom Volume 1"
        {...register("volume")}
      />
      <input
        className={inputClasses}
        type="number"
        placeholder="Номер тома (книга в серии - 1, 2, 3 и т.д)"
        {...register("book")}
      />
      <input
        className={inputClasses}
        type="number"
        placeholder="Год издания"
        {...register("year")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Издатель"
        {...register("publisher")}
      />
      <input
        className={inputClasses}
        type="number"
        placeholder="Год издания оригинала"
        {...register("original")}
      />
      <input
        className={inputClasses}
        type="text"
        placeholder="Издатель оригинала"
        {...register("original_publisher")}
      />
      <input
        className={inputClasses}
        type="file"
        placeholder="Издатель оригинала"
        {...register("cover")}
      />
      <button type="submit" className={buttonClasses}>
        Добавить
      </button>
    </form>
  );
}

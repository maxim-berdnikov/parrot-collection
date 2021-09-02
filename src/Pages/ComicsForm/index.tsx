import React from "react";
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
    title: string,
    authors: string,
    description: string,
    characters: string,
    edition: string,
    year: number;
    publisher: string,
    original: number,
    original_publisher: string
  };

  const onSubmit = (data: Comics) => {
    const authors = data.authors.split(", ");
    const characters = data.characters.split(", ");
    const newComics = {
      title: data.title,
      authors,
      description: data.description,
      characters,
      edition: data.edition,
      year: data.year,
      publisher: data.publisher,
      original: data.original,
      original_publisher: data.original_publisher
    };
    console.log(newComics);
    reset();
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
        placeholder="Тип издания"
        {...register("edition")}
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
      <button type="submit" className={buttonClasses}>
        Добавить
      </button>
    </form>
  );
}

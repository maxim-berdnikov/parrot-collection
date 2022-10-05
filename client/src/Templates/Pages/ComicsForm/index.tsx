import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ComicsFormProps } from "Types";
import { ROUTES } from "Helpers";
import "./style.scss";

export const ComicsForm = (): JSX.Element => {
	const { register, handleSubmit, reset } = useForm();
	const formClasses = "flex flex-col max-w-xs mt-2 mx-auto";
	const fieldClasses =
		"mb-2 px-2 border border-yellow-400 rounded focus:outline-none focus:border-pink-300";
	const inputClasses = `${fieldClasses} w-full h-10 appearance-none`;
	const checkboxClasses = "checkbox absolute opacity-0";
	const textareaClasses = `${fieldClasses} pt-1 h-20 resize-none`;
	const buttonClasses =
		"h-10 border border-transparent rounded bg-yellow-400 font-bold text-white";
	const labelClasses = `${fieldClasses} label w-10 h-10 cursor-pointer relative after:w-10 after:h-10`;

	const notify = (message: string) => toast(message);

	const onSubmit = (data: ComicsFormProps) => {
		const authors = data.authors.split(", ");
		const artists = data.artists.split(", ");
		const characters = data.characters.split(", ");
		const genres = data.genres.split(", ");
		let cover: string | ArrayBuffer | null = "";

		if (data.title) {
			const newComics = {
				title: data.title,
				authors,
				artists,
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
				isRead: data.isRead,
			};

			if (data.cover[0]) {


				if (data.cover[0].size > 100000) {
					notify("Большой размер файла обложки");
				} else {
					const FR = new FileReader();
					FR.addEventListener("load", (event) => {
						cover =
							event.target !== null && event.target.result
								? event.target.result
								: null;
					});
					FR.readAsDataURL(data.cover[0]);

					axios
						.post(ROUTES.api.addNewComics, newComics)
						.then(function (response) {
							console.log({ response });
							reset();
							notify("Добавлено!");
						})
						.catch(function (error) {
							console.log(error);
						});
				}
			} else {
				axios
					.post(ROUTES.api.addNewComics, newComics)
					.then(function (response) {
						console.log({ response });
						reset();
						notify("Добавлено!");
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	};

	return (
		<form
			className={formClasses}
			name="add-comics"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex justify-between gap-2.5">
				<input
					className={inputClasses}
					type="text"
					placeholder="Название"
					{...register("title")}
				/>
				<input
					className={checkboxClasses}
					type="checkbox"
					placeholder="Прочитано"
					id="isRead"
					{...register("isRead")}
				/>
				<label className={labelClasses} htmlFor="isRead"></label>
			</div>

			<input
				className={inputClasses}
				type="text"
				placeholder="Авторы"
				{...register("authors")}
			/>
			<input
				className={inputClasses}
				type="text"
				placeholder="Художники"
				{...register("artists")}
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
				placeholder="Обложка"
				{...register("cover")}
			/>
			<button type="submit" className={buttonClasses}>
				Добавить
			</button>
			<ToastContainer />
		</form>
	);
};

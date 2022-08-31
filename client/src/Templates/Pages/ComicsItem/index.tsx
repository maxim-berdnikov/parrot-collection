import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ReactQueryDevtools } from "react-query/devtools";
import { ComicsProps } from "Types";
import { Loader } from "Components/Loader";
import { useGetComicsItem } from "Hooks";
import { FIELDS, ROUTES } from "Helpers";
import "Pages/ComicsItem/style.scss";

export const ComicsItem = (): JSX.Element => {
	const { _id } = useParams<{ _id: string }>();
	const {
		isLoading: isComicsLoading,
		error: comicsError,
		data: comics,
		isFetching,
	} = useGetComicsItem(_id);

	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const ADMIN_MODE = true;

	const fieldClasses =
		"my-2 px-2 w-full border border-yellow-400	rounded focus:outline-none focus:border-pink-300";
	const inputClasses = `${fieldClasses} h-10 appearance-none`;
	const textareaClasses = `${fieldClasses} pt-1 h-20 resize-none`;
	const buttonClasses = "mt-4 mx-auto block w-48 h-8 bg-yellow-500 text-white";

	const deleteComicsItem = async () =>
		await axios
			.get<string>(
				`${process.env.REACT_APP_REQUEST_URL || ""}/api/comics/${_id}/delete`,
				{
					params: {
						_id,
					},
				}
			)
			.then((response) =>
				response.data === "Ok"
					? navigate("/parrot-collection/comics")
					: console.log({ response })
			);

	const handleDeleteComics = () => {
		alert("Вы уверены?");
		deleteComicsItem();
	};

	const notify = (message: string) => toast(message);

	const onSubmit = (data: ComicsProps) => {
		axios
			.post<string>(ROUTES.api.updateComics(_id), data)
			.then((response) =>
				response.data === "Ok"
					? notify("Информация о комиксе обновлена")
					: notify("При обновлении произошла ошибка")
			);
	};

	comicsError && console.log({ comicsError });

	return (
		<>
			{comicsError && <p>При загрузке данных произошла ошибка</p>}
			{(isComicsLoading || isFetching) && <Loader />}
			{comics && !isFetching && (
				<>
					<form className="mx-auto max-w-lg" onSubmit={handleSubmit(onSubmit)}>
						{comics.cover ? (
							<img
								className="book__img mx-auto mb-2 hover:cursor-pointer"
								src={comics.cover}
								alt={comics.title}
							/>
						) : (
							<div className="book__img book__img--mock mx-auto mb-2 hover:cursor-pointer"></div>
						)}

						{FIELDS.map((field) => {
							const currentField = comics[field.db as keyof ComicsProps];

							return field.db === "description" ? (
								<textarea
									key={field.db}
									className={textareaClasses}
									placeholder="Описание"
									defaultValue={currentField}
									disabled={!ADMIN_MODE}
									{...register(field.db)}
								/>
							) : (
								<input
									key={field.db}
									className={inputClasses}
									type="text"
									placeholder={field.ui}
									defaultValue={
										Array.isArray(currentField)
											? (currentField as string[]).join(", ") || ""
											: currentField || ""
									}
									disabled={!ADMIN_MODE}
									{...register(field.db)}
								/>
							);
						})}

						{ADMIN_MODE && (
							<>
								<button type="submit" className={buttonClasses}>
									Обновить
								</button>
								<button className={buttonClasses} onClick={handleDeleteComics}>
									Удалить
								</button>
							</>
						)}
					</form>
					<ToastContainer />
				</>
			)}
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
};

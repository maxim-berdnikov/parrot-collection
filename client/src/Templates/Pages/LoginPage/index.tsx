import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { userSlice } from "Store/userSliceReducer";

export const LoginPage = (): JSX.Element => {
	const { adminMode } = useAppSelector((state) => state.user);
	const { register, handleSubmit } = useForm();

	const dispatch = useAppDispatch();

	const checkUser = (data: { user: string }) => {
		if (process.env.REACT_APP_USER === data.user) {
			dispatch(userSlice.actions.checkUser(data.user));
		}
	};

	return (
		<div className="container mx-auto h-full grid grid-rows-1 grid-cols-1 items-center">
			<div className="wrapper">
				<h1 className="text-center">Проверим, кто ты такой</h1>
				<p>{`Режим администратора ${adminMode ? "включен" : "выключен"}`}</p>
				<form
					name="login"
					method="post"
					className="my-2 mx-auto flex flex-col"
					style={{ width: 320 }}
					onSubmit={handleSubmit(checkUser)}
				>
					<input
						type="text"
						className="border-2 border-green-300 h-10 px-2 rounded-lg text-center focus:outline-none focus:border-yellow-300"
						placeholder="Введи логин"
						{...register("user")}
					/>
					<button className="bg-green-300 mt-2 h-10 rounded-lg text-white font-bold">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

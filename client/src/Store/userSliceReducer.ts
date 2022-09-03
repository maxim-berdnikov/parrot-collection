import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserStateProps = {
	user: string;
	adminMode: boolean;
};

const initialState: UserStateProps = {
	user: "",
	adminMode: localStorage.getItem("adminMode") === "true",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		checkUser(state, action: PayloadAction<string>) {
			state.user = action.payload;
			state.adminMode = true;
			localStorage.setItem("adminMode", "true");
		},
	},
});

export const userSliceReducer = userSlice.reducer;

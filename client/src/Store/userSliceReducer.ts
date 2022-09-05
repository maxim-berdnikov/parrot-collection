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
			if (process.env.REACT_APP_USER === action.payload) {
				state.user = action.payload;
				state.adminMode = true;
				localStorage.setItem("adminMode", "true");
			} else {
				state.user = "";
				state.adminMode = false;
				localStorage.setItem("adminMode", "false");
			}
		},
	},
});

export const userSliceReducer = userSlice.reducer;

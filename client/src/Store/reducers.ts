import { combineReducers } from "@reduxjs/toolkit";
import { userSliceReducer } from "Store/userSliceReducer";

export const rootReducer = combineReducers({
	user: userSliceReducer,
});

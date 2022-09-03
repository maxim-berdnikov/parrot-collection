import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "Store/reducers";

export const setupStore = () => {
	return configureStore({ reducer: rootReducer });
};

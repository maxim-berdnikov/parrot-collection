import { rootReducer } from "Store/reducers";
import { setupStore } from "Store/store";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

import { configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slice/articleSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
  reducer: {
    articleSlice,
    userSlice,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

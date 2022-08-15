import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "userInfo",
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: [thunk]
});

export let persistor = persistStore(store);

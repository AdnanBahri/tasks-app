import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  REGISTER,
  PURGE,
  PERSIST,
  PAUSE,
  REHYDRATE,
  FLUSH,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import taskReducer from "./slices/taskSlice";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const tasksPersistConfig = {
  key: "tasks",
  storage: AsyncStorage,
  whitelist: ["tasks", "categories"],
  blacklist: ["isLoading", "isError", "errorMessage"],
};

const rootReducer = combineReducers({
  tasks: persistReducer(tasksPersistConfig, taskReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});

const persistor = persistStore(store);

export const clear = async () => {
  try {
    await persistor.purge();
  } catch (error) {
    console.log("Clearing Store Error", error);
  }
};

export { store, persistor };

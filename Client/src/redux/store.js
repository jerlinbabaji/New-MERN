import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import storage from redux-persist

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  user: userReducer,
});
//redux persist is used beacause when we refresh the page our user is erased,with persist user details that we signed in is still reflected in the redux toolkit.
const persistedReducer = persistReducer(persistConfig, rootReducer); // Pass persistConfig and rootReducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

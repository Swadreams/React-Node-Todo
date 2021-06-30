import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import errorReducer from './errorSlice';
import todoReducer from './todo/todoSlice';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  timeout: 6000,
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export const store = configureStore({
  reducer: persistCombineReducers(persistConfig, {
    auth: authReducer,
    errors: errorReducer,
    todo: todoReducer,
  }),
  middleware: [...getDefaultMiddleware({ serializableCheck: false })],
});

export const persistor = persistStore(store);

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import amazonReducer from "../redux/amazonslice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootreducer=combineReducers({
  amazon:amazonReducer,
})
const persistedReducer = persistReducer(persistConfig,rootreducer)
console.log(persistedReducer)
export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)



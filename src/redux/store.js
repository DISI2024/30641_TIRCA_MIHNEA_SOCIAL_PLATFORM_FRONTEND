import {configureStore} from "@reduxjs/toolkit";
import securityReducer from './slices/security/securitySlice'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

const persistConfig = {
    key: 'main-root',
    storage
}

const persistedReducer = persistReducer(persistConfig, securityReducer)

export const store = configureStore({
    reducer: {
        security: persistedReducer,
    }
})

export const Persistor = persistStore(store);

import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authReducers from './authSlice.js'
import jobReducers from './jobSlice.js'
import companyReducers from './companySlice.js'
import applicationReducers from './applicationSlice.js'

import {
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

const rootReducer = combineReducers({
    auth: authReducers,
    job: jobReducers,
    company: companyReducers,
    application: applicationReducers
})

const persistedReducer = persistReducer(persistConfig, rootReducer)






const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


export default store;
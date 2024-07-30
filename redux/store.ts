import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './booksSlice'
import borrowedReducer from './borrowedSlice'

export const store = configureStore({
    reducer: {
        books: booksReducer,
        borrowed: borrowedReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

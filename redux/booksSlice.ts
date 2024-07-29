import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book } from '@/constants/Types'

type BookPayload = PayloadAction<Book[]>

const initialState: Book[] = []

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action: BookPayload) => action.payload,
        clearBooks: () => initialState,
    },
})

export const selectBooks = (state: { books: Book[] }) => state.books

export const selectBookByTitle = createSelector(
    [selectBooks, (_: any, title: string) => title],
    (books, title) => books.find((book) => book.title === title)
)

export const { setBooks, clearBooks } = booksSlice.actions

export default booksSlice.reducer

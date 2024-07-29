import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book, searchApiResponseType } from '@/constants/Types'

type BookPayload = PayloadAction<Book[]>

const initialState: searchApiResponseType = {
    numFound: 0,
    start: 0,
    docs: [],
    q: '',
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<searchApiResponseType>) => {
            return action.payload
        },
        clearBooks: () => initialState,
    },
})

export const selectBooksState = (state: { books: searchApiResponseType }) =>
    state.books

export const selectBooks = (state: { books: searchApiResponseType }) =>
    state.books.docs

export const selectBookByTitle = createSelector(
    selectBooks,
    (_: unknown, title: string) => title,
    (books, title) => books.find((book) => book.title === title)
)
export const { setBooks, clearBooks } = booksSlice.actions

export default booksSlice.reducer

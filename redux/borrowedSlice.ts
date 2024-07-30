import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Book } from '@/constants/Types'

type BookPayload = PayloadAction<Book[]>

let initialState: Book[] = []

const borrowedSlice = createSlice({
    name: 'borrowed',
    initialState,
    reducers: {
        setBorrowed: (state, action: BookPayload) => {
            return action.payload
        },
        addBorrowed: (state, action: PayloadAction<Book>) => {
            state.push(action.payload)
        },
        removeBorrowed: (state, action: PayloadAction<string>) => {
            return state.filter((book) => book.key !== action.payload)
        },
        clearBorrowed: () => initialState,
    },
})

export const selectBorrowed = (state: { borrowed: Book[] }) => state.borrowed

export const selectBorrowedByKey = createSelector(
    [selectBorrowed, (_: any, key: string) => key],
    (borrowed, key) => borrowed.find((book) => book.key === key)
)

export const { setBorrowed, addBorrowed, removeBorrowed, clearBorrowed } =
    borrowedSlice.actions

export default borrowedSlice.reducer

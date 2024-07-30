import { selectBooks, setBooks } from '@/redux/booksSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    Book,
    searchApiQueryType,
    searchApiResponseType,
    imageQueryType,
} from '@/constants/Types'

const API_URL = 'https://openlibrary.org/search.json'
const API_URL_BOOK_IMAGE = 'https://covers.openlibrary.org/b/id/'
const API_URL_AUTHOR_IMAGE = 'https://covers.openlibrary.org/a/olid/'

export default function useBookApi() {
    const bookState = useSelector(selectBooks)
    const dispatch = useDispatch()

    const searchBooks = async (query: searchApiQueryType) => {
        return new Promise((resolve, reject) => {
            fetch(
                `${API_URL}?q=${query.q}&limit=${query.limit}&page=${query.page}`
            )
                .then((response) => response.json())
                .then((data: searchApiResponseType) => {
                    // console.log(data.docs[0])
                    dispatch(setBooks(data))
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    const fetchBookImageURL = (query: imageQueryType) => {
        return `${API_URL_BOOK_IMAGE}${query.value}-${query.size}.jpg`
    }

    const fetchAuthorImageURL = (query: imageQueryType) => {
        return `${API_URL_AUTHOR_IMAGE}${query.value}-${query.size}.jpg`
    }

    return { searchBooks, fetchBookImageURL, fetchAuthorImageURL }
}

import { Book } from '@/constants/Types'
import { firebaseDB } from '@/firebase/config'
import {
    addBorrowed,
    clearBorrowed,
    removeBorrowed,
    selectBorrowed,
    setBorrowed,
} from '@/redux/borrowedSlice'
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

const ROOT = 'books'
const FAV_BOOKS = 'favBooks'

export default function useFirebase() {
    const favBooks = useSelector(selectBorrowed)
    const dispatch = useDispatch()

    const getFavBookList = async () => {
        return new Promise((resolve, reject) => {
            const q = collection(firebaseDB, ROOT, FAV_BOOKS, 'works')
            dispatch(clearBorrowed())
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists()) {
                        dispatch(addBorrowed(doc.data() as Book))
                    }
                })
                resolve(favBooks)
            })
        })
    }

    const addFavBook = async (book: Book) => {
        return new Promise((resolve, reject) => {
            setDoc(doc(firebaseDB, ROOT, FAV_BOOKS, book.key), book)
                .then((e) => {
                    dispatch(setBorrowed([...favBooks, book]))
                    console.log('Document written with ID: ', e)
                    resolve(e)
                })
                .catch((error) => {
                    console.error('Error adding document: ', error)
                    reject(error)
                })
        })
    }

    const removeFavBook = async (key: string) => {
        return new Promise((resolve, reject) => {
            deleteDoc(doc(firebaseDB, ROOT, FAV_BOOKS, key))
                .then((e) => {
                    dispatch(
                        setBorrowed(favBooks.filter((book) => book.key !== key))
                    )
                    resolve(e)
                })
                .catch((error) => {
                    console.error('Error removing document: ', error)
                    reject(error)
                })
        })
    }

    const getFavBook = async (key: string) => {
        const docRef = doc(firebaseDB, ROOT, FAV_BOOKS, key)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data() as Book
        } else {
            console.log('No such document!')
            return null
        }
    }

    return { getFavBookList, addFavBook, removeFavBook, getFavBook }
}

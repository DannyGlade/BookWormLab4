import {
    addDoc,
    setDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    deleteDoc,
} from 'firebase/firestore'
import app, { firebaseDB } from './config'
import { Book } from '@/constants/Types'
import { useDispatch } from 'react-redux'
import { setBorrowed } from '@/redux/borrowedSlice'

const ROOT = 'books'
const FAV_BOOKS = 'favBooks'

export async function getFavBookList(): Promise<Book[]> {
    const dispatch = useDispatch()
    
    return new Promise((resolve, reject) => {
        const books: Book[] = []
        const q = collection(firebaseDB, ROOT, FAV_BOOKS)
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                books.push(doc.data() as Book)
            })
            dispatch(setBorrowed(books))
            resolve(books)
        })
    })
}

export async function addFavBook(book: Book) {
    setDoc(doc(firebaseDB, ROOT, FAV_BOOKS, book.key), book)
        .then((e) => {
            console.log('Document written with ID: ', e)
        })
        .catch((error) => {
            console.error('Error adding document: ', error)
        })
}

export async function removeFavBook(key: string) {
    const docRef = doc(firebaseDB, ROOT, FAV_BOOKS, key)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        await deleteDoc(docRef)
        console.log('Document successfully deleted!')
    } else {
        console.log('No such document!')
    }
}

import BookTile from '@/components/BookTile'
import useFirebase from '@/hooks/useFirebase'
import { clearBorrowed, selectBorrowed } from '@/redux/borrowedSlice'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import {
    YStack,
    Text,
    ScrollView,
    H1,
    YGroup,
    Separator,
    Spinner,
    XStack,
    Button,
} from 'tamagui'

const Borrowed = () => {
    const inset = useSafeAreaInsets()
    const favBooks = useSelector(selectBorrowed)
    const dispatch = useDispatch()
    const { getFavBookList, clearFavBooks } = useFirebase()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getFavBookList().then(() => {
            setLoading(false)
        })
    }, [])

    const clearBorrowedHandler = () => {
        clearFavBooks().then((e) => {
            Alert.alert('Success', 'All borrowed books cleared', [
                {
                    text: 'OK',
                    onPress: () => {},
                },
            ])
        })
    }

    return (
        <ScrollView
            paddingTop={inset.top}
            paddingHorizontal={16}
            backgroundColor={'$background025'}
        >
            <XStack justifyContent="space-between" alignItems="center">
                <H1>Borrowed</H1>
                <Button
                    onPress={clearBorrowedHandler}
                    icon={
                        <MaterialCommunityIcons name="delete-sweep" size={24} />
                    }
                ></Button>
            </XStack>

            <YGroup
                marginTop={16}
                separator={<Separator borderColor={'$background'} />}
            >
                {loading ? (
                    <>
                        <Spinner size="large" />
                    </>
                ) : (
                    favBooks.map((book, i) => (
                        <BookTile
                            key={book.key + i}
                            book={book}
                            parent="borrowed"
                            returnBtn={true}
                        />
                    ))
                )}

                {favBooks.length === 0 && (
                    <YStack gap={16}>
                        <Text>No borrowed books</Text>
                    </YStack>
                )}
            </YGroup>
        </ScrollView>
    )
}

export default Borrowed

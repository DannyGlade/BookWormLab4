import BookTile from '@/components/BookTile'
import useFirebase from '@/hooks/useFirebase'
import { clearBorrowed, selectBorrowed } from '@/redux/borrowedSlice'
import { useEffect, useState } from 'react'
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
    const { getFavBookList } = useFirebase()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getFavBookList().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <ScrollView
            paddingTop={inset.top}
            paddingHorizontal={16}
            backgroundColor={'$background025'}
        >
            <XStack>
                <H1>Borrowed</H1>
                <Button
                    onPress={() => {
                        dispatch(clearBorrowed())
                    }}
                >
                    Clear
                </Button>
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

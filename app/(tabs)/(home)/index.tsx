import useBookApi from '@/hooks/useBookApi'
import { selectBooks, selectBooksState } from '@/redux/booksSlice'
import Ionicons from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import {
    YStack,
    Text,
    H1,
    ScrollView,
    Input,
    XGroup,
    Button,
    YGroup,
    Spinner,
    Separator,
} from 'tamagui'
import BookTile from '@/components/BookTile'

const Index = () => {
    const inset = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const { searchBooks, fetchBookImageURL } = useBookApi()
    const bookState = useSelector(selectBooksState)

    const handleSubmit = () => {
        if (search === '') {
            return
        }
        setLoading(true)
        setPage(1)
        searchBooks({ q: search, limit: 10, page: 1 }).then(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (search !== '') {
            setLoading(true)
            searchBooks({ q: search, limit: 10, page }).then(() => {
                setLoading(false)
            })
        }
    }, [page])

    return (
        <ScrollView
            paddingTop={inset.top}
            paddingHorizontal={16}
            backgroundColor={'$background025'}
        >
            <H1>📚 BookWorm</H1>

            <YStack marginTop={16} gap={16} marginBottom={200}>
                <XGroup>
                    <Input
                        flex={1}
                        placeholder="Search"
                        value={search}
                        onChangeText={setSearch}
                    />
                    <Button
                        disabled={loading}
                        onPress={handleSubmit}
                        icon={<Ionicons name="search" size={24} />}
                    />
                </XGroup>
                <PaginationControls
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    bookState={bookState}
                />

                <YGroup
                    marginTop={16}
                    separator={<Separator borderColor={'$background'} />}
                >
                    {loading ? (
                        <>
                            <Spinner size="large" />
                        </>
                    ) : (
                        bookState.docs.map((book) => (
                            <BookTile key={book.key} book={book} />
                        ))
                    )}
                </YGroup>
                {bookState.numFound > 10 && (
                    <PaginationControls
                        loading={loading}
                        page={page}
                        setPage={setPage}
                        bookState={bookState}
                    />
                )}
            </YStack>
        </ScrollView>
    )
}

type PaginationControlsProps = {
    loading: boolean
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    bookState: ReturnType<typeof selectBooksState>
}
const PaginationControls = ({
    loading,
    page,
    setPage,
    bookState,
}: PaginationControlsProps) => {
    return (
        <XGroup>
            <Button
                disabled={loading}
                size={'$3'}
                onPress={() => setPage(1)}
                icon={<Feather name="chevrons-left" size={24} />}
            />
            <Button
                disabled={loading}
                size={'$3'}
                onPress={() => setPage((prev) => prev - 1)}
                icon={<Ionicons name="chevron-back" size={24} />}
            />
            <Input
                size={'$3'}
                textAlign="center"
                flex={1}
                value={`${page} / ${Math.ceil(bookState.numFound / 10)}`}
            />
            <Button
                disabled={loading}
                size={'$3'}
                onPress={() => setPage((prev) => prev + 1)}
                icon={<Ionicons name="chevron-forward" size={24} />}
            />
            <Button
                disabled={loading}
                size={'$3'}
                onPress={() => {
                    setPage(() => Math.ceil(bookState.numFound / 10))
                }}
                icon={<Feather name="chevrons-right" size={24} />}
            />
        </XGroup>
    )
}

export default Index

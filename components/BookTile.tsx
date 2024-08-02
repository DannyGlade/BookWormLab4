import { Book, parent } from '@/constants/Types'
import useBookApi from '@/hooks/useBookApi'
import useFirebase from '@/hooks/useFirebase'
import { selectBorrowedByKey } from '@/redux/borrowedSlice'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import {
    H4,
    ListItem,
    YGroup,
    YStack,
    Text,
    Image,
    Button,
    XStack,
} from 'tamagui'

type BookTileProps = {
    book: Book
    parent: parent
}
const BookTile = ({ book, parent }: BookTileProps) => {
    const router = useRouter()
    const { fetchBookImageURL } = useBookApi()
    const { addFavBook, removeFavBook } = useFirebase()
    const borrowed = useSelector((state) =>
        selectBorrowedByKey(state, book.key as string)
    )

    const handleAddFav = () => {
        try {
            addFavBook(book as Book)
                .then(() => {})
                .catch((e) => {
                    console.log('Error adding to fav: ', e)
                    if (e.type === 'maxBooks') {
                        Alert.alert('Error', e.message)
                    }
                })
        } catch (error) {
            console.log('Error adding to fav: ', error)
        }
    }

    const handleRemoveFav = () => {
        removeFavBook(book?.key as string)
    }

    return (
        <YGroup.Item key={book.key}>
            <ListItem
                padding={0}
                icon={null}
                gap={16}
                onPress={() =>
                    router.push({
                        pathname: `(${parent})/detail`,
                        params: { key: book.key },
                    })
                }
            >
                <Image
                    src={fetchBookImageURL({
                        key: 'id',
                        value: book.cover_i?.toString() ?? '',
                        size: 'M',
                    })}
                    width={100}
                    height={150}
                />
                <XStack justifyContent="space-between" flex={1}>
                    <YStack gap={4} flex={1}>
                        <H4 numberOfLines={1}>{book.title}</H4>
                        <YGroup>
                            <Text fontWeight={'bold'}>Authors: </Text>
                            <Text numberOfLines={2}>
                                {book.author_name?.join(', ')}
                            </Text>
                        </YGroup>

                        <YGroup>
                            <Text fontWeight={'bold'}>Publish Year: </Text>
                            <Text>{book.first_publish_year}</Text>
                        </YGroup>
                    </YStack>
                    <Button
                        icon={
                            <Ionicons
                                name={
                                    borrowed !== undefined
                                        ? 'bookmark'
                                        : 'bookmark-outline'
                                }
                                size={30}
                                color={'$color'}
                            />
                        }
                        onPress={() => {
                            borrowed !== undefined
                                ? handleRemoveFav()
                                : handleAddFav()
                        }}
                        chromeless
                    />
                </XStack>
            </ListItem>
        </YGroup.Item>
    )
}

export default BookTile

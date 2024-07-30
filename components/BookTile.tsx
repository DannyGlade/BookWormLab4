import { Book, parent } from '@/constants/Types'
import useBookApi from '@/hooks/useBookApi'
import { useRouter } from 'expo-router'
import { H4, ListItem, YGroup, YStack, Text, Image } from 'tamagui'

type BookTileProps = {
    book: Book
    parent: parent
}
const BookTile = ({ book, parent }: BookTileProps) => {
    const router = useRouter()
    const { fetchBookImageURL } = useBookApi()

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
                <YStack width={'100%'} gap={4}>
                    <H4 width={'60%'} numberOfLines={1}>
                        {book.title}
                    </H4>
                    <YGroup>
                        <Text fontWeight={'bold'}>Authors: </Text>
                        <Text width={'60%'} numberOfLines={2}>
                            {book.author_name?.join(', ')}
                        </Text>
                    </YGroup>

                    <YGroup>
                        <Text fontWeight={'bold'}>Publish Year: </Text>
                        <Text>{book.first_publish_year}</Text>
                    </YGroup>
                </YStack>
            </ListItem>
        </YGroup.Item>
    )
}

export default BookTile

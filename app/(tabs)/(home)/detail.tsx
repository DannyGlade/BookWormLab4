import { Book } from '@/constants/Types'
import useBookApi from '@/hooks/useBookApi'
import { selectBookByKey } from '@/redux/booksSlice'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import {
    YStack,
    Text,
    ScrollView,
    Image,
    XStack,
    H2,
    Button,
    Paragraph,
    Spacer,
    Spinner,
    H4,
} from 'tamagui'

const Detail = () => {
    const { key } = useLocalSearchParams()
    const bookDetail = useSelector((state) =>
        selectBookByKey(state, key as string)
    )
    const inset = useSafeAreaInsets()
    const { fetchBookImageURL, fetchAuthorImageURL } = useBookApi()

    return (
        <ScrollView backgroundColor={'$background025'}>
            {/* <H1> {key}</H1> */}
            {bookDetail == null && (
                <>
                    <YStack
                        padding={20}
                        gap={20}
                        alignItems="center"
                        height={'100%'}
                    >
                        <Spacer />
                        <Spinner color={'$color'} scale={2} />
                        <Text>Loading...</Text>
                        <Spacer />
                    </YStack>
                </>
            )}

            {bookDetail != null && (
                <>
                    <Image
                        src={fetchBookImageURL({
                            key: 'id',
                            value: bookDetail.cover_i?.toString() ?? '',
                            size: 'L',
                        })}
                        width={'100%'}
                        height={400}
                    />
                    <YStack padding={20} gap={20}>
                        <XStack
                            gap={10}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <YStack width={'80%'} gap={5}>
                                <H2 numberOfLines={3}>{bookDetail.title}</H2>
                                <Text>{bookDetail.first_publish_year}</Text>
                            </YStack>

                            <Button
                                icon={
                                    <Ionicons
                                        name="bookmark-outline"
                                        size={30}
                                        color={'$color'}
                                    />
                                }
                                chromeless
                            />
                        </XStack>
                        <YStack gap={5}>
                            <H4>Authors:</H4>
                            <ScrollView horizontal gap={5}>
                                <XStack>
                                    {bookDetail.author_name?.map(
                                        (author, index) => (
                                            <YStack
                                                key={index}
                                                gap={5}
                                                width={100}
                                                alignItems="center"
                                            >
                                                {console.log(
                                                    fetchAuthorImageURL({
                                                        key: 'name',
                                                        value: bookDetail
                                                            .author_key[index],
                                                        size: 'M',
                                                    })
                                                )}
                                                <Image
                                                    src={fetchAuthorImageURL({
                                                        key: 'name',
                                                        value: bookDetail
                                                            .author_key[index],
                                                        size: 'M',
                                                    })}
                                                    width={80}
                                                    height={80}
                                                    borderRadius={40}
                                                    backgroundColor={
                                                        '$background'
                                                    }
                                                />
                                                <Text>{author}</Text>
                                            </YStack>
                                        )
                                    )}
                                </XStack>
                            </ScrollView>
                        </YStack>
                        <YStack gap={5}>
                            <H4>Subject:</H4>
                            <Paragraph>
                                {bookDetail.subject?.join(', ')}
                            </Paragraph>
                        </YStack>
                        <YStack gap={5}>
                            <H4>Publisher:</H4>
                            <Paragraph>
                                {bookDetail.publisher?.join(', ')}
                            </Paragraph>
                        </YStack>

                        {/* <XStack gap={10}>
                            {detailedContent.Ratings.map((rating, index) => (
                                <YStack
                                    key={index}
                                    gap={5}
                                    width={'30%'}
                                    justifyContent="space-between"
                                >
                                    <Text>{rating.Source}</Text>
                                    <Text>{rating.Value}</Text>
                                </YStack>
                            ))}
                        </XStack> */}

                        {/* <Text>Rated: {detailedContent.Rated}</Text> */}

                        {/* <Paragraph>{detailedContent.Plot}</Paragraph> */}

                        {/* <Text>Release Date: {detailedContent.Released}</Text> */}

                        {/* <XStack gap={5}>
                            <YStack gap={5}>
                                <Text>Director:</Text>
                                <Text>Writer: </Text>
                                <Text>Actors: </Text>
                            </YStack>
                            <YStack gap={5} width={'90%'}>
                                <Text numberOfLines={1}>
                                    {detailedContent.Director}
                                </Text>
                                <Text numberOfLines={1}>
                                    {detailedContent.Writer}
                                </Text>
                                <Text numberOfLines={1}>
                                    {detailedContent.Actors}
                                </Text>
                            </YStack>
                        </XStack>
                        <Text>Language: {detailedContent.Language}</Text>
                        <Text>Country: {detailedContent.Country}</Text>
                        <Text>Awards: {detailedContent.Awards}</Text>
                        <Text>imdbRating: {detailedContent.imdbRating}</Text>
                        <Text>imdbVotes: {detailedContent.imdbVotes}</Text>
                        <Text>BoxOffice: {detailedContent.BoxOffice}</Text> */}
                    </YStack>
                </>
            )}
        </ScrollView>
    )
}

export default Detail

import { Book } from '@/constants/Types'
import useBookApi from '@/hooks/useBookApi'
import useFirebase from '@/hooks/useFirebase'
import { selectBookByKey } from '@/redux/booksSlice'
import { selectBorrowedByKey } from '@/redux/borrowedSlice'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
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
    const { fetchBookImageURL, fetchAuthorImageURL } = useBookApi()
    const { addFavBook, removeFavBook } = useFirebase()

    const borrowed = useSelector((state) =>
        selectBorrowedByKey(state, key as string)
    )
    // console.log(borrowed)

    const bookDetail = useSelector((state) =>
        selectBookByKey(state, key as string)
    )
    const inset = useSafeAreaInsets()

    const handleAddFav = () => {
        try {
            addFavBook(bookDetail as Book).then(() => {})
        } catch (error) {
            console.log('Error adding to fav: ', error)
        }
    }

    const handleRemoveFav = () => {
        removeFavBook(bookDetail?.key as string)
    }

    return (
        <ScrollView backgroundColor={'$background025'}>
            {bookDetail == null && (
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
                    </YStack>
                </>
            )}
        </ScrollView>
    )
}

export default Detail

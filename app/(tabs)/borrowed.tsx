import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack, Text, ScrollView, H1 } from 'tamagui'

const Borrowed = () => {
    const inset = useSafeAreaInsets()
    return (
        <ScrollView
            paddingTop={inset.top}
            paddingHorizontal={16}
            backgroundColor={'$background025'}
        >
            <H1>Borrowed</H1>
        </ScrollView>
    )
}

export default Borrowed

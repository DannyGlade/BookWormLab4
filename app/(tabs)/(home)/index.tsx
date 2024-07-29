import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack, Text, H1, ScrollView } from 'tamagui'

const Index = () => {
    const inset = useSafeAreaInsets()
    return (
        <ScrollView
            paddingTop={inset.top}
            paddingHorizontal={16}
            backgroundColor={'$background025'}
        >
            <H1>📚 BookWorm</H1>
        </ScrollView>
    )
}

export default Index

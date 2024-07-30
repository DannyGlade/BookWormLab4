import CustomNavigationScreenOption from '@/constants/Styles'
import CustomNavigationHeaderStyle from '@/constants/Styles'
import { Stack } from 'expo-router'

export default function StackLayout() {
    Stack.defaultProps = {
        screenOptions: CustomNavigationScreenOption(),
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Borrowed',
                }}
            />
            <Stack.Screen
                name="detail"
                options={{
                    title: 'Detail',
                }}
            />
        </Stack>
    )
}

import { useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { config } from '../tamagui.config'
import { Provider as ReduxProvider } from 'react-redux'
import store from '@/redux/store'

export function Provider({
    children,
    ...rest
}: Omit<TamaguiProviderProps, 'config'>) {
    const colorScheme = useColorScheme()

    return (
        <TamaguiProvider
            config={config}
            defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
            {...rest}
        >
            <ReduxProvider store={store}>{children}</ReduxProvider>
        </TamaguiProvider>
    )
}

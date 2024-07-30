import { useTheme } from "tamagui";

export default function CustomNavigationScreenOption() {
  const theme = useTheme();

  return {
    headerStyle: {
      backgroundColor: theme?.background?.get(),
      // backgroundColor: 'transparent',
    },
    headerTintColor: theme?.color?.get(),
    headerTitleStyle: {
      color: theme?.color?.get(),
    },
  };
}

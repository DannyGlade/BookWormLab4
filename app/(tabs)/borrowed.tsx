import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, Text } from "tamagui";

const Borrowed = () => {
  const inset = useSafeAreaInsets();
  return (
    <YStack paddingTop={inset.top}>
      <Text>Borrowed</Text>
    </YStack>
  );
};

export default Borrowed;

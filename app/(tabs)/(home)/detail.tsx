import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, Text } from "tamagui";

const Detail = () => {
  const inset = useSafeAreaInsets();
  return (
    <YStack paddingTop={inset.top}>
      <Text>Home</Text>
    </YStack>
  );
};

export default Detail;

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, Text } from "tamagui";

const Index = () => {
  const inset = useSafeAreaInsets();
  return (
    <YStack paddingTop={inset.top}>
      <Text>Home</Text>
    </YStack>
  );
};

export default Index;

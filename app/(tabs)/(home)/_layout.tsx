import CustomNavigationScreenOption from "@/constants/Styles";
import CustomNavigationHeaderStyle from "@/constants/Styles";
import { Stack } from "expo-router";

export default function StackLayout() {
  Stack.defaultProps = {
    // screenOptions: CustomNavigationScreenOption(),
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "Detail",
        }}
      />
    </Stack>
  );
}

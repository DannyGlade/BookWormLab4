import { Stack } from "expo-router";

export default function StackLayout() {
  Stack.defaultProps = {
    screenOptions: {
      headerShown: false,
    },
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Stack>
  );
}

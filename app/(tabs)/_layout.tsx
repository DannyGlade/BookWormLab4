import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "tamagui";
import CustomNavigationScreenOption from "@/constants/Styles";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const customNavigationScreenOption = CustomNavigationScreenOption();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.color12?.get(),
        tabBarInactiveTintColor: theme.color1?.get(),
        tabBarStyle: {
          backgroundColor: theme.color10?.get(),
          borderTopWidth: 0,
        },
        ...customNavigationScreenOption,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="borrowed"
        options={{
          title: "Borrowed",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "book" : "book-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

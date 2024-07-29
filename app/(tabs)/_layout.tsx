import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useTheme } from "tamagui";
import CustomNavigationScreenOption from "@/constants/Styles";

export default function TabLayout() {
  const theme = useTheme();
  const customNavigationScreenOption = CustomNavigationScreenOption();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.color1?.get(),
        tabBarInactiveTintColor: theme.color?.get(),
        tabBarStyle: {
          backgroundColor: theme.accentBackground?.get(),
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

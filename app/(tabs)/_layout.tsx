// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ tabBarLabel: 'Home', headerTitle: 'Home Page' }}
      />
      <Tabs.Screen
        name="list"
        options={{ tabBarLabel: 'List', headerTitle: 'List Page' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarLabel: 'Profile', headerTitle: 'Profile Page' }}
      />
    </Tabs>
  );
}

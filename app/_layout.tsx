// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        router.replace('./welcome'); // If authenticated, go to the welcome screen
      } else {
        setIsAuthenticated(false);
        router.replace('/login'); // If not authenticated, go to login
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="(tabs)" options={{ title: "Tabs" }} />
    </Stack>
  );
}

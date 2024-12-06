import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: 'AIzaSyCsv3CsVJL4ri6Gz6I3UiCfxatoYVWoxbw',
    authDomain: 'thesis-ad543.firebaseapp.com',
    projectId: 'thesis-ad543',
    storageBucket: 'thesis-ad543.appspot.com', 
    messagingSenderId: '1836074086378738059',
    appId: '1:885904173811:android:ef336df3417631e854a586',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage to persist auth state
});

export { auth };

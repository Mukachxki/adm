//app\home.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      
    
      <View style={styles.horizontalButtons}>
        <Button title="ADD FACULTY" onPress={() => router.push('./buttons/faculty')} />
        <Button title="ADD STUDENT" onPress={() => router.push('./buttons/student')} />
        <Button title="FACULTY RATINGS" onPress={() => router.push('./buttons/rating')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  horizontalButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '80%',
  },
});

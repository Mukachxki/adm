import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth, db } from '../../../firebaseConfig'; // Import Firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function AddFacultyForm() {
  const [form, setForm] = useState({
    name: '',
    idNumber: '',
    program: '',
    phone: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    setForm({
      name: '',
      idNumber: '',
      program: '',
      phone: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Save additional info in Firestore
      await setDoc(doc(db, 'faculties', user.uid), {
        name: form.name,
        idNumber: form.idNumber,
        program: form.program,
        phone: form.phone,
        email: form.email,
      });

      console.log('Faculty added successfully');
      handleCancel(); // Reset the form
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error adding faculty:', error);
      } else {
        setError('An unknown error occurred');
        console.error('Error adding faculty:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>ADD FACULTY</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Last Name, First Name"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          value={form.idNumber}
          onChangeText={(text) => handleChange('idNumber', text)}
        />
        <Picker
          selectedValue={form.program}
          onValueChange={(itemValue) => handleChange('program', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Program" value="" />
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="C" value="C" />
          <Picker.Item label="D" value="D" />
          <Picker.Item label="E" value="E" />
          <Picker.Item label="F" value="F" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={form.phone}
          onChangeText={(text) => handleChange('phone', text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="PHINMA Email"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#000000',
    borderRadius: 10,
    width: '90%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  addButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

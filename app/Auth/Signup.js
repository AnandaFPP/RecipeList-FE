import * as React from "react"
import { StyleSheet, Text, View, Alert } from 'react-native'
import { NativeBaseProvider, Button, Box, FormControl, Input, Icon } from 'native-base';
import { Link, useNavigation } from "expo-router";
import FeatherIcon from "react-native-vector-icons/Feather";
// import FlatButton from "../../components/Login/FlatButton";
import { useState } from "react";
import axios from "axios";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const isEmailValid = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phone) => {
    // Simple phone number validation: 10 digits
    return /^\d{10}$/.test(phone);
  };

  const isPasswordValid = (password) => {
    // Password should be at least 6 characters
    return password.length >= 6;
  };

  const validateForm = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("All fields are required.");
      return false;
    }

    if (!isEmailValid(email)) {
      Alert.alert("Invalid email address.");
      return false;
    }

    if (!isPhoneValid(phone)) {
      Alert.alert("Invalid phone number. Please enter 10 digits.");
      return false;
    }

    if (!isPasswordValid(password)) {
      Alert.alert("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password and Confirm Password do not match.");
      return false;
    }

    return true;
  };

  const register = () => {
    if (validateForm()) {
      const data = {
        users_name: name,
        users_email: email,
        users_phone: phone,
        users_password: password,
        users_confirmpassword: confirmPassword,
      };
      axios.post("http://172.20.10.2:8008/users/register", data).then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        Alert.alert('Account has been created!');
        navigation.navigate("Login")
        // Additional actions after successful registration
      });
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Lets Get Started !</Text>
        <Text style={{ color: "#C4C4C4", fontWeight: "bold" }}>Create new account to access all features</Text>
        <Box m="5">
          <FormControl style={{ padding: 10 }}>
            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='user' />} size={7} m={2} />} variant='outline' placeholder="Name" width={350} height={60} value={name} onChangeText={(value) => setName(value)}/>
          </FormControl>
          <FormControl style={{ padding: 10 }}>
            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='mail' />} size={7} m={2} />} variant='outline' placeholder="Email" width={350} height={60} value={email} onChangeText={(value) => setEmail(value)}/>
          </FormControl>
          <FormControl style={{ padding: 10 }}>
            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='phone' />} size={7} m={2} />} variant='outline' placeholder="Phone Number" width={350} height={60} value={phone} onChangeText={(value) => setPhone(value)}/>
          </FormControl>
          <FormControl style={{ padding: 10 }}>
            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='lock' />} size={7} m={2} />} variant='outline' placeholder="Create New Password" width={350} height={60} secureTextEntry={true} value={password} onChangeText={(value) => setPassword(value)}/>
          </FormControl>
          <FormControl style={{ padding: 10 }}>
            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='unlock' />} size={7} m={2} />} variant='outline' placeholder="New Password" width={350} height={60} secureTextEntry={true} value={confirmPassword} onChangeText={(value) => setConfirmPassword(value)}/>
          </FormControl>
        </Box>
        {/* <FlatButton text='Create' onPress={() => Alert.alert('Create account successful')}/> */}
        <Button onPress={register} style={{ width: 350, marginVertical: 10, backgroundColor: '#EFC81A', fontWeight: 20 }}>Create</Button>
        <View style={{ paddingTop: 5 }}>
          <Text style={{ color: "#C4C4C4", fontWeight: "bold" }}>Already have account?
            <Text onPress={() => navigation.navigate('Login')} style={{ color: "#EFC81A" }}> Log in Here</Text>
          </Text>
        </View>
      </View>
    </NativeBaseProvider>

  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    // backgroundColor: "cyan"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 20,
    color: "#EFC81A"
  }
})
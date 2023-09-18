import * as React from "react"
import { StyleSheet, Text, View, Image } from 'react-native'
import { NativeBaseProvider, Button, Box, FormControl, Input, Icon, Alert } from 'native-base';
import { Link, useNavigation } from "expo-router";
import FeatherIcon from "react-native-vector-icons/Feather";
// import FlatButton from "../../components/AuthComp/FlatButton";
import Home from "../Screens/home";
import MainContainer from "../MainContainer";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const getToken = async () => {
    const dataUser = await AsyncStorage.getItem("token_user");
    if (!dataUser) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Home");
      getToken();
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const login = () => {
    const data = {
      users_email: email,
      users_confirmpassword: password
    };
    axios
    .post("http://172.20.10.2:8008/users/login", data)
    .then((res) => {
        AsyncStorage.setItem("token_user", res.data.data.token_user);
        AsyncStorage.setItem("users_id", res.data.data.users_id);

        setEmail("");
        setPassword("");
        navigation.navigate("Home");
        alert("Login successful!");
    })
    .catch((error) => {
      console.error("Axios error:", error);
      if (error.response) {
        if (error.response.status === 400) {
          alert("Email or password is incorrect.");
        } else {
          alert("Email or password is incorrect.");
        }
      } else {
        alert("Email or password is incorrect.");
      }
    });
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View>
          <Image source={require('../../assets/barbecue1.jpg')} style={styles.picture} />
        </View>
        <Text style={styles.title}>Welcome !</Text>
        <Text style={{ color: "#C4C4C4", fontWeight: "bold" }}>Log in to your existing account</Text>
        <Box m="5">
          <FormControl style={{ padding: 10 }}>
            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='user' />} size={7} m={2} />} style={styles.formInput} variant='outline' placeholder="Email" width={350} height={60} value={email} onChangeText={(value) => setEmail(value)} />
          </FormControl>
          <FormControl style={{ padding: 10 }}>
            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='lock' />} size={7} m={2} />} style={styles.formInput} variant='outline' placeholder="Password" width={350} height={60} secureTextEntry={true} value={password} onChangeText={(value) => setPassword(value)} />
          </FormControl>
        </Box>
        <View style={{ flexDirection: "row-reverse", width: 350, marginVertical: 10 }}>
          <Link href="/">
            <Text style={{ color: "#C4C4C4", fontWeight: "bold" }}>Forgot password?</Text>
          </Link>
        </View>
        {/* <FlatButton text='Log in' onPress={() => navigation.navigate(MainContainer)}/> */}
        <Button onPress={login} style={{ width: 350, marginVertical: 10, backgroundColor: '#EFC81A', fontWeight: 20 }}>Log In</Button>
        <View style={{ paddingTop: 5 }}>
          <Text style={{ color: "#C4C4C4", fontWeight: "bold" }}>Don't have an account?
            <Text onPress={() => navigation.navigate('Signup')} style={{ color: "#EFC81A" }}> Sign up</Text>
          </Text>
        </View>
      </View>
    </NativeBaseProvider>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 20,
    color: "#EFC81A"
  }
})
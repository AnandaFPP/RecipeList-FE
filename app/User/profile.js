import * as React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { NativeBaseProvider } from 'native-base';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import Navbar from "../../components/NavbarComp/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const listItems = [
    { icon: 'edit', description: 'Edit Profile', route: 'Edit' },
    { icon: 'book-open', description: 'My Recipe', route: 'MyRecipe' },
    { icon: 'bookmark', description: 'Saved Recipe', route: 'SavedRecipe' },
    { icon: 'heart', description: 'Liked Recipe', route: 'LikedRecipe' },
  ];

  const navigateToPage = (route) => {
    navigation.navigate(route);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    await axios
      .get(`http://172.20.10.2:8008/users/profile/${dataUser}`)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token_user')
      AsyncStorage.removeItem('users_id')
      navigation.navigate('Login')
      alert('Log out success!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <NativeBaseProvider>
      <View>
        <View style={styles.containerTop}>
          <View style={styles.centeredContent}>
            <Image source={
              data.users_photo === "null" ||
                data.users_photo === null ||
                data.users_photo === ""
                ? require("../../assets/user.png")
                : { uri: data.users_photo}
            } style={styles.profilePic} />
            <Text style={styles.profileName}>
              {data.users_name}
            </Text>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.bottomContainer}>
            {listItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => navigateToPage(item.route)}
              >
                <FeatherIcon name={item.icon} size={24} color="#EEC302" style={styles.listIcon} />
                <Text style={styles.listDescription}>{item.description}</Text>
                <FeatherIcon name="chevron-right" size={24} color="#6D61F2" style={styles.listArrowIcon} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={logout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Navbar />
    </NativeBaseProvider>
  )
}

export default Profile

const styles = StyleSheet.create({
  containerTop: {
    width: "100%",
    height: 308,
    backgroundColor: "#EEC302",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContent: {
    alignItems: "center",
  },
  profilePic: {
    width: 84,
    height: 84,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white'
  },
  containerBottom: {
    alignItems: "center",
  },
  bottomContainer: {
    width: 375,
    height: 512,
    flexShrink: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: -20,
    padding: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  listIcon: {
    marginRight: 20,
  },
  listDescription: {
    flex: 1,
    fontSize: 16,
  },
  listArrowIcon: {
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#EEC302',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
})

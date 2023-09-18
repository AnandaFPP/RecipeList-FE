import { TouchableOpacity } from "react-native";
import React from "react";
import { View, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = () => {
  const navigation = useNavigation();
  const goToHome = () => {
    navigation.navigate("Home");
  };
  const goToAddRecipe = () => {
    navigation.navigate("AddRecipe");
  };
  const goToProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      navigation.navigate("Profile", { userId });
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.icon} onPress={goToHome}>
          <FeatherIcon name="home" color="#6E80B0" size={24} onPress={goToHome} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FeatherIcon
            name="plus-square"
            color="#6E80B0"
            size={24}
            onPress={goToAddRecipe}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FeatherIcon
            name="user"
            color="#6E80B0"
            size={24}
            onPress={goToProfile}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 76,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  wrap: {
    flexDirection: "row",
  },
  home: {
    width: 97,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
  },
});

export default Navbar;
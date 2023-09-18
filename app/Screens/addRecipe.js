import * as React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { NativeBaseProvider, Button, Box, FormControl, Input, Icon, ScrollView } from 'native-base';
import FeatherIcon from "react-native-vector-icons/Feather";
import Navbar from "../../components/NavbarComp/Navbar";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createRecipeActions } from "../config/redux/actions/recipeAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

export default function AddRecipe({ navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState("");
    const [userLogin, setUserLogin] = useState("");

    const dispatch = useDispatch();

    const userId = async () => {
        const id = await AsyncStorage.getItem("users_id")
        setUserLogin(id)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const handleSubmit = () => {
        try {
            dispatch(createRecipeActions(title, description, video, image, userLogin))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userId()
    }, [])

    return (
        <NativeBaseProvider>
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Add Your Recipe</Text>
                <View>
                    <Box m="5">
                        <FormControl style={{ padding: 10 }}>
                            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='book-open' />} size={7} m={2} />} style={styles.formInput} variant='outline' placeholder="Title" width={350} height={60} value={title} onChangeText={setTitle}/>
                        </FormControl>
                        <FormControl style={{ padding: 10 }}>
                            <Input style={styles.formInput} variant='outline' placeholder="Description" width={350} height={200} multiline={true} textAlignVertical="top" value={description} onChangeText={setDescription}/>
                        </FormControl>
                        <FormControl style={{ padding: 10 }}>
                            <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='video' />} size={7} m={2} />} style={styles.formInput} variant='outline' placeholder="Add Video" width={350} height={60} value={video} onChangeText={setVideo}/>
                        </FormControl>
                        <FormControl style={{ padding: 10 }}>
                            <Button backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='camera' />} size={7} m={2} />} style={styles.formImage} variant='outline' placeholder="Add Photo" width={350} height={60} onPress={pickImage}>Add Photo</Button>
                            {image && <Image source={{ uri: image }} style={{ width: 350, height: 200, marginTop: 20, borderRadius: 15 }} />}
                        </FormControl>
                    </Box>
                </View>
                <Button style={styles.postButton} onPress={handleSubmit}>POST</Button>
            </View>
            </ScrollView>
            <Navbar />
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100
    },
    formImage: {
        color: "red",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        paddingTop: 20,
        color: "#EFC81A"
    },
    postButton: {
        width: 190,
        marginVertical: 10,
        backgroundColor: '#EFC81A',
        fontWeight: "bold",
        height: 50,
    }
})

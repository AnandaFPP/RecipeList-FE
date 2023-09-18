import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Box, Button, Center, FormControl, Icon, Input, NativeBaseProvider } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


const Edit = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    };

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

    // const getData = async () => {
    //     const id = await AsyncStorage.getItem("users_id");
    //     await axios
    //         .get(`http://172.20.10.2:8008/users/profile/${id}`)
    //         .then((response) => {
    //             setData(response.data.data);
    //         })
    //         .catch((error) => console.log(error));
    // };

    const handleSubmit = async () => {
        try {
            const id = await AsyncStorage.getItem("users_id");
            const formData = new FormData();
            formData.append('users_name', name)
            if (image) {
                formData.append("users_photo", {
                    uri: image,
                    name: "photo.jpg",
                    type: "image/jpeg",
                });
            }
            const user = await axios.put(
                `http://172.20.10.2:8008/users/profile/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert('Your profile has been updated successfully!')
            console.log(user.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                    <Icon
                        as={FeatherIcon}
                        name="chevron-left"
                        size={10}
                        color="black"
                    />
                </TouchableOpacity>
                <Box mt='5'>
                    <FormControl style={{ padding: 10 }}>
                        <Input backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='user' />} size={7} m={2} />} style={styles.formInput} variant='outline' placeholder="Name" width={350} height={60} value={name} onChangeText={(value) => setName(value)} />
                    </FormControl>
                    <FormControl style={{ padding: 10 }}>
                        <Button backgroundColor={"#F5F5F5"} InputLeftElement={<Icon as={<FeatherIcon name='camera' />} size={7} m={2} />} style={styles.formImage} variant='outline' placeholder="Change Photo Profile" width={350} height={60} onPress={pickImage}>Change Photo Profile</Button>
                        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 20, borderRadius: 50, marginLeft: 'auto', marginRight: 'auto' }} />}
                    </FormControl>
                </Box>
                <Button style={styles.postButton} onPress={handleSubmit}>EDIT</Button>
            </View>
        </NativeBaseProvider>
    )
}

export default Edit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 10,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 20,
        backgroundColor: '#e6eced',
        borderRadius: 16,
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
        color: '#EFC81A',
    },
    postButton: {
        width: 190,
        marginVertical: 10,
        backgroundColor: '#EFC81A',
        fontWeight: "bold",
        height: 50,
    }
})
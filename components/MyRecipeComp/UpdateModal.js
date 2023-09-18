import React, { useEffect, useState } from "react";
import {
    Image,
    NativeBaseProvider,
    Container,
    Text,
    Input,
    Icon,
    View,
    ScrollView,
    HStack,
    Box,
    Center,
    VStack,
    Button,
    TextArea,
} from "native-base";
import {
    FlatList,
    Modal,
    StyleSheet,
    useWindowDimensions,
    Pressable,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { updateRecipeActions } from "../../app/config/redux/actions/recipeAction";
import * as ImagePicker from "expo-image-picker";

const UpdateModal = ({
    recipes_id,
    recipes_title,
    recipes_ingredients,
    recipes_photo,
    recipes_video,
    getData,
}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(recipes_title);
    const [description, setDescription] = useState(recipes_ingredients);
    const [video, setVideo] = useState(recipes_video);
    const [image, setImage] = useState(null);

    const updateRecipe = () => {
        dispatch(
            updateRecipeActions(
                title,
                description,
                video,
                image,
                recipes_id,
                setModalVisible,
                getData
            )
        );
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
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

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <ScrollView>
                        <Text>Edit Recipe</Text>
                        <Pressable
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 10,
                            }}
                            onPress={() => {
                                pickImage();
                            }}
                        >
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    alt="Recipe Photo"
                                    size="lg"
                                />
                            ) : (
                                <Box
                                    style={{
                                        backgroundColor: "#ddd",
                                        width: 200,
                                        height: 200,
                                        borderRadius: 15,
                                    }}
                                >
                                    <Center flex={1}>
                                        <FeatherIcon
                                            name="camera"
                                            size={40}
                                            color="#555"
                                        />
                                        <Text>Add Photo</Text>
                                    </Center>
                                </Box>
                            )}
                        </Pressable>
                        <Input
                            mt={3}
                            variant="filled"
                            placeholder="Recipe Title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <TextArea
                            mt={3}
                            variant="filled"
                            placeholder="Ingredients"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <Input
                            mt={3}
                            variant="filled"
                            placeholder="Recipe Video"
                            value={video}
                            onChangeText={(text) => setVideo(text)}
                        />
                        <Button
                            mt={3}
                            colorScheme="teal"
                            onPress={updateRecipe}
                        >
                            Update Recipe
                        </Button>
                        <Button
                            mt={3}
                            colorScheme="red"
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            Cancel
                        </Button>
                    </ScrollView>
                </View>
            </Modal>
            <Button
                style={{ width: 40, backgroundColor: "#337CCF" }}
                onPress={() => setModalVisible(true)}
            >
                <FeatherIcon name="edit" size={18} color={"white"} />
            </Button>
        </View>
    );
};

export default UpdateModal;

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "#EFEFEF",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
import { StyleSheet, Text, View, TouchableOpacity, Image, RefreshControl, Modal } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Button, Icon, NativeBaseProvider, ScrollView, HStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipeActions, getRecipeByUserId } from '../config/redux/actions/recipeAction';
import UpdateModal from '../../components/MyRecipeComp/UpdateModal';
import axios from 'axios';


const MyRecipe = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible2] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const navigateBack = () => {
        navigation.goBack();
    };

    const fetchData = async () => {
        setIsRefreshing(true);
        await dispatch(getRecipeByUserId());
        setIsRefreshing(false);
    };

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [dispatch, isFocused])

    const recipes = useSelector((state) => state.recipe.recipe)


    const getData = async () => {
        const id = await AsyncStorage.getItem("users_id");
        await axios
            .get(`http://172.20.10.2:8008/recipes/users/${id}`)
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = async (recipes_id) => {
        await dispatch(deleteRecipeActions(recipes_id));
        fetchData();
    };

    return (
        <NativeBaseProvider>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                }
            >
                <View style={styles.container}>
                    <Text style={styles.title}>My Recipe</Text>
                    <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                        <Icon
                            as={FeatherIcon}
                            name="chevron-left"
                            size={10}
                            color="black"
                        />
                    </TouchableOpacity>
                    {recipes.map((data, index) => (
                        <View key={index} style={styles.popularCard}>
                            <Image
                                source={{ uri: data.recipes_photo }}
                                style={styles.popularCardImage}
                            />
                            <View style={styles.popularCardContent}>
                                <Text style={styles.popularCardRecipeName}>
                                    {data.recipes_title}
                                </Text>
                                <Text style={styles.popularCardCategory}>
                                    Created at
                                </Text>
                                <Text style={styles.popularCardCategory}>
                                    {data.recipes_created}
                                </Text>
                                {/* <View style={styles.popularCardRating}>
                                <FeatherIcon name="star" size={16} color="#FFD700" />
                                <Text style={styles.ratingText}>
                                    {data.rating.toFixed(1)}
                                </Text>
                            </View> */}
                            </View>
                            <View style={styles.actionButtons}>
                                <UpdateModal
                                    recipes_title={data.recipes_title}
                                    recipes_id={data.recipes_id}
                                    recipes_video={data.recipes_video}
                                    recipes_photo={data.recipes_photo}
                                    recipes_ingredients={data.recipes_ingredients}
                                    getData={getData}
                                />
                                <Button
                                    style={{ width: 43, backgroundColor: "red" }}
                                    //   onPress={() => handleDelete(item.recipes_id)}
                                    onPress={() => setModalVisible2(!modalVisible)} ml={2}
                                >
                                    <FeatherIcon name="trash-2" size={18} color={"white"} />
                                </Button>

                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setModalVisible2(!modalVisible);
                                    }}

                                >
                                    <View style={styles.modalView}>
                                        <Text marginLeft={'auto'} marginRight={'auto'} fontSize={20}>Are you sure want to delete this recipe?</Text>
                                        <HStack mt={5} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                            <Button
                                                onPress={() => setModalVisible2(!modalVisible)}
                                                mr={3}
                                            >
                                                Cancel
                                            </Button>
                                            <Button backgroundColor={'red.600'} w={20} onPress={() => handleDelete(data.recipes_id)} >Hapus</Button>
                                        </HStack>
                                    </View>
                                </Modal>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default MyRecipe;

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
    popularCard: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    popularCardImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 20,
    },
    popularCardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    popularCardRecipeName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    popularCardCategory: {
        fontSize: 14,
        color: '#B6B6B6',
        marginBottom: 5,
    },
    popularCardRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        fontSize: 14,
        marginLeft: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        margin: 5
    },
    activeButton: {
        backgroundColor: "#EFC81A",
    },
    inactiveButton: {
        borderWidth: 1,
        borderColor: "#EFC81A",
    },
    modalView: {
        marginTop: 100,
        marginHorizontal:10,
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
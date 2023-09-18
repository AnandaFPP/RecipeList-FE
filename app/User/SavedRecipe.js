import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Icon, NativeBaseProvider, Button, HStack } from 'native-base';
import axios from 'axios';


const SavedRecipe = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible2] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`http://172.20.10.2:8008/bookmarks`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const navigateBack = () => {
        navigation.goBack();
    };

    const handleDelete = (bookmarks_id) => {
        axios.delete(`http://172.20.10.2:8008/bookmarks/${bookmarks_id}`)
            .then(() => {
                alert('You just unlike this recipe')
                getData();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Saved Recipe</Text>
                <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                    <Icon
                        as={FeatherIcon}
                        name="chevron-left"
                        size={10}
                        color="black"
                    />
                </TouchableOpacity>
                {data.map((data, index) => (
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
                            <Button
                                style={{ width: 50, backgroundColor: "red" }}
                                //   onPress={() => handleDelete(item.recipes_id)}
                                onPress={() => setModalVisible2(!modalVisible)} ml={3}
                            >
                                <FeatherIcon name="trash-2" size={20} color={"white"} />
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
                                    <Text marginLeft={'auto'} marginRight={'auto'} fontSize={20}>Unsave this recipe?</Text>
                                    <HStack mt={5} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        <Button
                                            onPress={() => setModalVisible2(!modalVisible)}
                                            mr={3}
                                        >
                                            Cancel
                                        </Button>
                                        <Button backgroundColor={'red.600'} w={20} onPress={() => handleDelete(data.bookmarks_id)} >Hapus</Button>
                                    </HStack>
                                </View>
                            </Modal>
                        </View>
                    </View>
                ))}
            </View>
        </NativeBaseProvider>
    )
}

export default SavedRecipe

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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
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
})
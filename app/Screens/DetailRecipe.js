import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Image, Button, Icon, Box, ScrollView } from 'native-base';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Navbar from "../../components/NavbarComp/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getDetailRecipe } from "../config/redux/actions/recipeAction";

const DetailRecipe = () => {

    const [data, setData] = useState();
    const route = useRoute();
    const { recipes_id } = route.params;

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getDetailRecipe(recipes_id))
    // }, [dispatch])

    // const recipe = useSelector((state) => state.recipe.recipeDetail)

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        try {
            axios.get(`http://172.20.10.2:8008/recipes/${recipes_id}`)
                .then((res) => {
                    setRecipe(res.data.data[0])
                })
            // console.log(res.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }, [recipes_id])

    const navigation = useNavigation();

    const [selectedStep, setSelectedStep] = React.useState(null);

    const navigateBack = () => {
        navigation.goBack();
    };

    const insertLike = async () => {
        const userId = await AsyncStorage.getItem("users_id")
        const data = {
            recipes_id: recipes_id,
            users_id: userId
        }
        axios.post(`http://172.20.10.2:8008/likeds`, data)
            .then((res) => {
                setData(res.data.data);
                alert('You just liked this recipe!')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const insertSave = async () => {
        const userId = await AsyncStorage.getItem("users_id")
        const data = {
            recipes_id: recipes_id,
            users_id: userId
        }
        axios.post(`http://172.20.10.2:8008/bookmarks`, data)
            .then((res) => {
                setData(res.data.data);
                alert('You just saved this recipe!')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const DescriptionTab = () => (
        <View style={styles.bottomContainer}>
            <Box style={styles.pillContainer}>
                <Text style={styles.pillDescription}>{recipe.recipes_ingredients}</Text>
            </Box>
        </View>
    );

    const VideoStepTab = () => (
        <View style={styles.bottomContainer}>
            <Box style={styles.videoCardContainer}>
                <View style={styles.iconContainer}>
                    <Icon as={FeatherIcon} name="play" size={12} color="#FFF" />
                </View>
                <View style={styles.videoContent}>
                    <Text style={styles.videoTitle}>Instruction</Text>
                    <Text style={styles.videoTitle}>{recipe.recipes_title}</Text>
                    <Text style={styles.videoDesc}>{recipe.recipes_video}</Text>
                </View>
            </Box>
        </View>
    );

    const renderScene = SceneMap({
        description: DescriptionTab,
        videoStep: VideoStepTab,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'description', title: 'Description' },
        { key: 'videoStep', title: 'Video Step' },
    ]);

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.scrollView}>
                <View style={styles.containerTop}>
                    <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                        <Icon as={FeatherIcon} name="arrow-left" size={8} color="red" />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: recipe.recipes_photo }}
                        alt="Recipe Background"
                        style={styles.backgroundImage}
                    />
                    <View style={styles.overlayContent}>
                        <View style={styles.bottomLeft}>
                            <Text style={styles.profileName}>{recipe.recipes_title}</Text>
                            <Text style={styles.creatorRecipe}>{recipe.recipes_title}</Text>
                        </View>
                        <View style={styles.bottomRight}>
                            <Button backgroundColor={"#EEC302"} variant="outline" colorScheme="warning" size="sm" style={styles.actionButton} onPress={insertSave}>
                                <Icon as={FeatherIcon} name="bookmark" size={10} color="#FFF" />
                            </Button>
                            <Button backgroundColor={"#FFF"} variant="outline" colorScheme="warning" size="sm" style={styles.actionButton} onPress={insertLike}>
                                <Icon as={FeatherIcon} name="heart" size={10} color="#EEC302" />
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.bottomContainer}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            renderTabBar={props => (
                                <TabBar
                                    {...props}
                                    indicatorStyle={styles.tabIndicator}
                                    style={styles.tabBar}
                                    labelStyle={styles.tabLabel}
                                />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
            <Navbar />
        </NativeBaseProvider>
    )
}

export default DetailRecipe;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 70
    },
    containerTop: {
        position: 'relative',
        height: 450,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    overlayContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    bottomLeft: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    bottomRight: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    actionButton: {
        marginLeft: 10,
        borderRadius: 100,
    },
    profileName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    creatorRecipe: {
        fontSize: 12,
        color: '#B0B0B0',
    },
    containerBottom: {
        alignItems: "center",
    },
    bottomContainer: {
        width: "100%",
        height: 420,
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
        padding: 10,
    },
    pillContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 30,
        width: "100%",
        backgroundColor: "#FAF7ED",
        borderRadius: 15,
    },
    pillDescription: {
        fontSize: 16,
        padding: 10,
    },
    pillVideo: {
        fontSize: 14,
        color: '#6D61F2',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    selectedDescription: {
        color: '#EEC302',
    },
    selectedVideo: {
        color: '#EEC302',
    },
    tabIndicator: {
        backgroundColor: '#EEC302',
        width: 190,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tabBar: {
        backgroundColor: 'white',
    },
    tabLabel: {
        color: '#666',
        fontWeight: "bold",
    },
    videoCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAF7ED',
        borderRadius: 25,
        padding: 15,
        marginTop: 20,
    },
    iconContainer: {
        backgroundColor: '#EEC302',
        padding: 10,
        borderRadius: 20,
        marginRight: 20,
    },
    videoTitle: {
        fontSize: 16,
        color: 'black',
    },
    videoDesc: {
        fontSize: 16,
        color: '#B6B6B6',
    },
});

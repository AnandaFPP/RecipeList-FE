import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { Icon, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const PopularMenu = () => {
    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    };

    const [popularMenuList, setPopularMenuList] = useState([
        {
            imageSource: require('../../assets/popularmenu1.jpeg'),
            recipeName: 'Margherita',
            category: 'Spicy',
            rating: 4.5,
            savedActive: false,
            likedActive: false,
        },
        {
            imageSource: require('../../assets/popularmenu2.jpeg'),
            recipeName: 'Veg Loaded',
            category: 'Spicy',
            rating: 4.3,
            savedActive: false,
            likedActive: false,
        },
        {
            imageSource: require('../../assets/popularmenu3.jpeg'),
            recipeName: 'Farm House',
            category: 'Spicy',
            rating: 4.1,
            savedActive: false,
            likedActive: false,
        },
        {
            imageSource: require('../../assets/popularmenu4.jpeg'),
            recipeName: 'Fresh Veggie',
            category: 'Spicy',
            rating: 4.0,
            savedActive: false,
            likedActive: false,
        },
        {
            imageSource: require('../../assets/popularmenu5.jpeg'),
            recipeName: 'Tomato',
            category: 'Spicy',
            rating: 4.7,
            savedActive: false,
            likedActive: false,
        },
    ]);

    const toggleSaved = (index) => {
        const updatedMenuList = [...popularMenuList];
        updatedMenuList[index].savedActive = !updatedMenuList[index].savedActive;
        setPopularMenuList(updatedMenuList);
    };

    const toggleLiked = (index) => {
        const updatedMenuList = [...popularMenuList];
        updatedMenuList[index].likedActive = !updatedMenuList[index].likedActive;
        setPopularMenuList(updatedMenuList);
    };

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Popular Menu</Text>
                <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
                    <Icon
                        as={FeatherIcon}
                        name="chevron-left"
                        size={10}
                        color="black"
                    />
                </TouchableOpacity>
                {popularMenuList.map((menu, index) => (
                    <View key={index} style={styles.popularCard}>
                        <Image
                            source={menu.imageSource}
                            style={styles.popularCardImage}
                        />
                        <View style={styles.popularCardContent}>
                            <Text style={styles.popularCardRecipeName}>
                                {menu.recipeName}
                            </Text>
                            <Text style={styles.popularCardCategory}>
                                {menu.category}
                            </Text>
                            <View style={styles.popularCardRating}>
                                <FeatherIcon name="star" size={16} color="#FFD700" />
                                <Text style={styles.ratingText}>
                                    {menu.rating.toFixed(1)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    menu.savedActive ? styles.activeButton : styles.inactiveButton,
                                ]}
                                onPress={() => toggleSaved(index)}
                            >
                                <FeatherIcon name="bookmark" size={20} color={menu.savedActive ? 'white' : '#EFC81A'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    menu.likedActive ? styles.activeButton : styles.inactiveButton,
                                ]}
                                onPress={() => toggleLiked(index)}
                            >
                                <FeatherIcon name="thumbs-up" size={20} color={menu.likedActive ? 'white' : '#EFC81A'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </NativeBaseProvider>
    );
};

export default PopularMenu;

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
        marginTop: 25,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
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

});


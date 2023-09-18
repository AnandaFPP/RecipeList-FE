import * as React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { Box, FormControl, Input, Icon, NativeBaseProvider, Button } from 'native-base';
import FeatherIcon from "react-native-vector-icons/Feather";
import PopularCard from '../../components/HomeComp/PopularCard'
import NewRecipesSection from '../../components/HomeComp/NewRecipes';
import CategoriesSection from '../../components/HomeComp/CategoryList';
import Navbar from "../../components/NavbarComp/Navbar";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    // const logout = async () => {
    //     try {
    //         await AsyncStorage.removeItem('token_user')
    //         AsyncStorage.removeItem('users_id')
    //         navigation.navigate('Login')
    //         alert('Log out success!')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const categories = [
        { imageSource: require('../../assets/Group48.png'), name: 'Soup' },
        { imageSource: require('../../assets/Group47.png'), name: 'Chicken' },
        { imageSource: require('../../assets/Group49.png'), name: 'Seafood' },
        { imageSource: require('../../assets/Group50.png'), name: 'Dessert' },
    ];

    const onPressMoreInfo = () => {
        navigation.navigate('PopularMenu');
    };

    return (
        <NativeBaseProvider>
            <ScrollView
                style={{ flex: 1, paddingTop: 20, marginBottom: 70 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor="#EFC81A"
                    />
                }
            >
                {/* <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={logout}
                >
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity> */}
                <View style={{ padding: 20 }}>
                    <Box>
                        <FormControl>
                            <Input backgroundColor={"#EFEFEF"} InputLeftElement={<Icon as={<FeatherIcon name='search' />} size={7} ml={3} color={"#C4C4C4"} />} variant='outline' placeholder="Search Pasta, Bread, etc" width={"100%"} height={60} borderRadius={20} />
                        </FormControl>
                    </Box>
                    <View>
                        <Text onPress={() => alert('This is the "home" screen.')} style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 25 }}>
                            Popular for you
                        </Text>
                    </View>
                    <CategoriesSection categories={categories} />
                    <View>
                        <Text onPress={() => alert('This is the "home" screen.')} style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 25 }}>
                            New Recipes
                        </Text>
                    </View>
                    <NewRecipesSection />
                    <View style={styles.headerContainer}>
                        <Text onPress={() => alert('This is the "home" screen.')} style={styles.headerText}>
                            Popular Recipes
                        </Text>
                        <TouchableOpacity onPress={onPressMoreInfo}>
                            <Text style={styles.moreInfoText}>
                                More Info
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <PopularCard
                            imageSource={require('../../assets/popularcard.jpeg')}
                            name="Teriyaki Salmon"
                            category="Spicy"
                            rating={4.5}
                        />
                    </View>
                    <View>
                        <PopularCard
                            imageSource={require('../../assets/popularcard.jpeg')}
                            name="Teriyaki Salmon"
                            category="Spicy"
                            rating={4.5}
                        />
                    </View>
                </View>
            </ScrollView>
            <Navbar />
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 25
    },
    moreInfoText: {
        fontSize: 16,
        color: 'blue',
    },
});

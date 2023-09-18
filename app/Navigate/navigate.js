import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import Home from '../Screens/home';
import DetailRecipe from '../Screens/DetailRecipe';
import PopularMenu from '../Screens/PopularMenu';
import AddRecipe from '../Screens/addRecipe';
import Profile from '../User/profile';
import Edit from '../User/Edit';
import MyRecipe from '../User/MyRecipe';
import SavedRecipe from '../User/SavedRecipe';
import LikedRecipe from '../User/LikedRecipe';

const Stack = createStackNavigator();

export default function Navigate() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DetailRecipe"
                component={DetailRecipe}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PopularMenu"
                component={PopularMenu}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AddRecipe"
                component={AddRecipe}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Edit"
                component={Edit}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MyRecipe"
                component={MyRecipe}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SavedRecipe"
                component={SavedRecipe}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="LikedRecipe"
                component={LikedRecipe}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
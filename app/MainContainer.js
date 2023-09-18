import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, createAppContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import HomeScreen from './Screens/home';
import AddRecipeScreen from './Screens/addRecipe';
import Profile from './User/profile';
import EditScreen from './User/Edit';
import MyRecipeScreen from './User/MyRecipe';
import SavedRecipeScreen from './User/SavedRecipe';
import LikedRecipeScreen from './User/LikedRecipe';
import DetailRecipeScreen from './Screens/DetailRecipe';
import PopularMenuScreen from './Screens/PopularMenu';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainContainer = () => {
  const homeName = 'Home';
  const AddRecipeName = 'Add Recipe';
  const profileName = 'Profile';

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === homeName) {
              iconName = 'home';
            } else if (route.name === AddRecipeName) {
              iconName = 'plus-square';
            } else if (route.name === profileName) {
              iconName = 'user';
            }

            return <FeatherIcon name={iconName} size={25} color={color} />;
          },
          headerShown: false,
        })}
        tabBarOptions={{
          activeTintColor: '#FFF',
          activeBackgroundColor: '#EEC302',
        }}
        tabBarStyle={{
          backgroundColor: '#EEC302',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingVertical: 20,
        }}
      >
        <Tab.Screen name={homeName}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="DetailRecipe" component={DetailRecipeScreen} options={{ headerShown: false, tabBarVisible: false }} />
              <Stack.Screen name="PopularMenu" component={PopularMenuScreen} options={{ headerShown: false }} />
            </Stack.Navigator>  
          )}
        </Tab.Screen>
        <Tab.Screen name={AddRecipeName} component={AddRecipeScreen} />
        <Tab.Screen name={profileName}>
        {() => (
            <Stack.Navigator>
              <Stack.Screen name={profileName} component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name="Edit" component={EditScreen} options={{ headerShown: false, tabBarVisible: false }} />
              <Stack.Screen name="MyRecipe" component={MyRecipeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SavedRecipe" component={SavedRecipeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LikedRecipe" component={LikedRecipeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          )}
          </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;

// import * as React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer, createAppContainer } from '@react-navigation/native';
// import LoginScreen from "./Login";
// import SignupScreen from "./Signup"

// const Stack = createStackNavigator();

// export default function MainAuth() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen
//                     name="Login"
//                     component={LoginScreen}
//                     options={{
//                         tabBarShowLabel: false,
//                         headerShown: false,
//                     }}
//                 />
//                 <Stack.Screen
//                     name="Signup"
//                     component={SignupScreen}
//                     options={{
//                         headerTransparent: true,
//                         title: "",
//                         headerTintColor: "black",
//                     }}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }
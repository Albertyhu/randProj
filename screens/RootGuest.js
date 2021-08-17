import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './SignIn.js';
import SignUp from './SignUp.js';

const Stack = createStackNavigator();

const RootGuest = () =>{
return(
<Stack.Navigator screenOptions = {{
    headerShown: false, }}>
    <Stack.Screen name = 'SignUp' component = {SignUp} options = {{title: 'Sign Up',
    }}/>
    <Stack.Screen name = 'SignIn' component = {SignIn} options = {{title: 'Sign In',
    }}/>
</Stack.Navigator>
)
}

export default RootGuest;
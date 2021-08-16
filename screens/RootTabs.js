import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons';
import {openDrawer} from '@react-navigation/drawer';

import Home from './home.js';
import Explore from './explore.js';
import Profile from './profile.js';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export const RootTabs = () =>{
return (
    <Tab.Navigator>
        <Tab.Screen name = "Home" component ={HomeStackScreen} />
        <Tab.Screen name = 'Explore' component = {ExploreStackScreen} />
        <Tab.Screen name = 'Profile' component = {ProfileStackScreen} />
    </Tab.Navigator>
)
}

const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = ({navigation}) =>{
return(
<HomeStack.Navigator screenOptions = {{
    headerStyle: {backgroundColor: '#00AAFF'}
}}>
    <HomeStack.Screen name = 'HomeStack' component = {Home} options = {{
        title: 'Home',
        headerLeft: () => <Icon.Button name = 'ios-menu' color = '#fff' backgroundColor = '#00aaff' size = {25} onPress = {() => navigation.openDrawer()} />
    }} />
</HomeStack.Navigator>
)
}

const ProfileStackScreen = ({navigation}) =>{
return(
<ProfileStack.Navigator screenOptions = {{
    headerStyle: {backgroundColor: '#A8E6CF'}
}}>
    <ProfileStack.Screen name = 'HomeStack' component = {Home} options = {{
        title: 'Home',
        headerLeft: () => <Icon.Button name = 'ios-menu' color = '#fff' backgroundColor = '#A8E6CF' size = {25} onPress = {() => navigation.openDrawer()} />
    }} />
</ProfileStack.Navigator>
)
}

const ExploreStackScreen = ({navigation}) =>{
return(
<ExploreStack.Navigator screenOptions = {{
    headerStyle: {backgroundColor: '#FBB40C'}
}}>
    <ExploreStack.Screen name = 'HomeStack' component = {Home} options = {{
        title: 'Home',
        headerLeft: () => <Icon.Button name = 'ios-menu' color = '#fff' backgroundColor = '#FBB40C' size = {25} onPress = {() => navigation.openDrawer()} />
    }} />
</ExploreStack.Navigator>
)
}

const styles = StyleSheet.create({
container:{},
})
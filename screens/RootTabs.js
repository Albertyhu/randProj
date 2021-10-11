import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
//import Icon from 'react-native-vector-icons';
//import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import {openDrawer} from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser,
setName,
fetchProfilePic,
setProfilePic,
fetchUserPosts,
Visit_ProfileID,
SetFollowers,} from '../reduxFolder/actions/index.js';
import firebase from 'firebase';

import Home from './home.js';
import Explore from './explore.js';
import Profile from './profile.js';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeBarColor = () =>{
return '#00AAFF'
}

const ExploreBarColor = () =>{
return '#FBB40C'
}

const ProfileBarColor = () =>{
return '#A8E6CF'
}

const RootTabs = (props) =>{
const {fetchUser, setName, fetchProfilePic, setProfilePic,  ProPicUR, fetchUserPosts, Visit_ProfileID, SetFollowers} = props;
const { navigation } = props;
useEffect(()=>{
    fetchUser();
    setName();
    fetchUserPosts();
    //stores the download URL of profile pic into redux store
    setProfilePic();
    SetFollowers();
}, [])
return (
    <Tab.Navigator
        initialRouteName = 'Home'
        inactiveColor = '#B0B0B0'
        activeColor = '#fff'
        /*For some reason, in the bare workflow version, shifting prop is necessary*/
        shifting = {true}
    >
        <Tab.Screen name = "Home" component ={HomeStackScreen} options ={{
            tabBarColor:  HomeBarColor(),
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => <Icon name = 'home' color = {color} size = {25} />
        }}/>
        <Tab.Screen name = 'Explore' component = {ExploreStackScreen} options = {{
            tabBarColor: ExploreBarColor(),
            tabBarLabel: 'Explore',
            tabBarIcon: ({color}) => <Icon name = 'navigate-circle-outline' color = {color} size = {25} />
        }}/>
        <Tab.Screen name = 'Profile'
            component = {ProfileStackScreen}
            listeners = {({navigation}) => ({
                tabPress: event => {
                    event.preventDefault();
                    Visit_ProfileID(firebase.auth().currentUser.uid);
                    navigation.navigate("Profile");
                }
                })}
            options = {{
            tabBarColor: ProfileBarColor(),
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => <Icon name = 'ios-person' color = {color} size = {25} />
        }}/>
    </Tab.Navigator>
)
}

const mapDispatch = (dispatch) => bindActionCreators({fetchUser,
setName,
fetchProfilePic,
setProfilePic,
fetchUserPosts,
Visit_ProfileID,
SetFollowers}, dispatch)

const mapStatetoProps = store =>({
    ProPicURL: store.userState.profilePicURL,
})

export default connect (mapStatetoProps, mapDispatch)(RootTabs);

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
    <ProfileStack.Screen name = 'HomeStack' component = {Profile} options = {{
        title: 'Profile',
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
    <ExploreStack.Screen name = 'HomeStack' component = {Explore} options = {{
        title: 'Explore',
        headerLeft: () => <Icon.Button name = 'ios-menu' color = '#fff' backgroundColor = '#FBB40C' size = {25} onPress = {() => navigation.openDrawer()} />
    }} />
</ExploreStack.Navigator>
)
}

const styles = StyleSheet.create({
container:{},
})
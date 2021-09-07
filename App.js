import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, openDrawer} from '@react-navigation/drawer';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

//import { firebase } from '@firebase/app'
import 'firebase/auth';
import {AuthContext, AuthProvider} from './component/AuthContext.js';
//code for connecting redux to react native
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reduxFolder/reducers';
import {fetchUser} from './reduxFolder/actions/index';

import Explore from './screens/explore.js';
import RootGuest from './screens/RootGuest.js';
import {RootTabs} from './screens/RootTabs.js';
import Loading from './screens/loading.js';
import {DrawerContent} from './screens/DrawerContent.js';
import EditProfile from './screens/EditProfile.js';

const store = createStore(RootReducer, applyMiddleware(thunk))
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
const mapStateToProps = (store) => ({
   currentUser: store.userState.currentUser
})
const Stack = createStackNavigator();
const EditStack = createStackNavigator();

var firebaseConfig = {
    apiKey: "AIzaSyBtyxv904sSImhhtkgnO3XtER5LW1KArx8",
    authDomain: "randproj-41a0d.firebaseapp.com",
    databaseURL: "https://randproj-41a0d-default-rtdb.firebaseio.com",
    projectId: "randproj-41a0d",
    storageBucket: "randproj-41a0d.appspot.com",
    messagingSenderId: "886374789756",
    appId: "1:886374789756:web:27bd0e2cf61430f1dacff9",
    measurementId: "G-HQQGEEZ67J"
 };

 //makes sure there isn't already a firebase app initialized, so that the app doesn't crash.
 if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
 }
 // firebase.analytics();

const Drawer = createDrawerNavigator();

export default function App() {

const initialData = {
    email: '',
    password: '',
    token: '',
    firstName: '',
    lastName: '',

}

const [ loggedIn, setLog] = React.useState(false);
const [isLoading, setLoading] = React.useState(true);
const [userName, setName ] = React.useState('');

const dataReducer = (prevState, action) =>{
switch(action.type){
    case 'LOGIN':
    return{
        ...prevState,
        email: action.mail,
        password: action.pass,
        token: action.userToken,
        }
    case 'LOGOUT':
        return{
        ...prevState,
        email: '',
        password: '',
        token: '',
        }
    case 'REGISTER':
        return{
        ...prevState,
        email: action.mail,
        password: action.pass,
        token: action.userToken,
        }
    case 'RETRIEVE':
        return{
        ...prevState,
        email: action.mail,
        password: action.pass,
        token: action.userToken,
        }
}
}

const [data, dispatch] = React.useReducer(dataReducer, initialData);

const context = React.useMemo(()=>({


}))

const Direct = () =>{
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    return(
        <RootTab />
    )

    // ...
  } else {
    // User is signed out
    // ...

    return(
        <RootGuest />
    )
  }
});
}

useEffect(()=>{
setTimeout(async () =>{
    await firebase.auth().onAuthStateChanged((user) => {
        if(!user){
            setLog(false);

        }
        else{
            setLog(true);

        }
    })
    setLoading(false);
    }, 2000)
}, [])

  return (
<Provider store = {store}>
<AuthContext.Provider value = {context}>
{isLoading ?
<Loading />
:
<NavigationContainer>
    {loggedIn ?
        <Drawer.Navigator drawerContent = {props => <DrawerContent {...props} /> }>
            <Drawer.Screen name = 'RootTabs' component = {RootTabs} options = {{
                headerShown: false,
            }}/>
            <Drawer.Screen name = 'EditProfile' component = {EditStackScreen} options ={{
                headerShown: false,
             }}/>
        </Drawer.Navigator>

    : <RootGuest />
    }
</NavigationContainer>
}
</AuthContext.Provider>
</Provider>
  );
}

connect(mapStateToProps, mapDispatchProps)(App);

const EditStackScreen = ({navigation}) =>{
return(
<EditStack.Navigator>
    <EditStack.Screen name = 'EditProfileStack' component = {EditProfile} options = {{
        title: 'Edit Your Profile',
        headerLeft: () => <Icon.Button
            name = 'ios-menu'
            color = '#000'
            size = {25}
            onPress = {() => navigation.openDrawer()}
            style = {styles.iosMenu}
        />,
    }} />
</EditStack.Navigator>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    iosMenu:{
      paddingLeft: 10,
      backgroundColor: '#fff',
    },
});


import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import firebase from 'firebase';

//import { firebase } from '@firebase/app'
import 'firebase/auth';
import {AuthContext, AuthProvider} from './component/AuthContext.js';


import Explore from './screens/explore.js';
import RootGuest from './screens/RootGuest.js';
import {RootTabs} from './screens/RootTabs.js';
import Loading from './screens/loading.js';
import Route from './component/route.js';

const Stack = createStackNavigator();
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

export default function App() {

const initialData = {
    email: '',
    password: '',
    token: '',
    firstName: '',
    lastName: '',
}

const [ loggedIn, setLog] = React.useState(false);

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
signIn: (email, password, token) =>{
    dispatch({type: 'LOGIN', mail: email, pass: password, userToken: token});
}
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
    firebase.auth().onAuthStateChanged((user) => {
        if(!user){
            setLog(false);
        }
        else{
            setLog(true);
        }
    })
}, [])

  return (
<NavigationContainer>
    {loggedIn ? <RootTabs /> : <RootGuest />}
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

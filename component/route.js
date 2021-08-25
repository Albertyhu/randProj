import React, {useEffect, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, AuthProvider } from './AuthContext.js';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase';
require('firebase/auth')

import {RootTabs} from '../screens/RootTabs';
import RootGuest from '../screens/RootGuest.js';

const Route = () =>{
const {user, setUser} = useContext(AuthContext);
const [initializing, setInitializing] = useState(true);

const onAuthStateChanged = (user) => {
     setUser(user);
     if(initializing) setInitializing(false);
}

useEffect(()=>{
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;

}, [])

if(initializing) return null;
return(
<NavigationContainer>
    {user ? <RootTabs /> : <RootGuest />}
</NavigationContainer>
)
}

export default Route;
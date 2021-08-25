import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button, TouchableOpacity} from 'react-native'

import firebase from 'firebase';
require ('firebase/auth');

const Home = () =>{

const SignOut = () =>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}


return(
<View style = {styles.container}>
    <Text>Home</Text>
    <Button title = 'Sign Out' onPress = {SignOut} />
</View>
)
}

export default Home;

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})
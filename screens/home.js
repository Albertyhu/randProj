import React, {useEffect, Fragment} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import { createStore} from 'redux';
import { fetchUser} from '../reduxFolder/actions/index.js';
import {AuthContext} from '../component/AuthContext.js';

import firebase from 'firebase';
require ('firebase/auth');
require ('firebase/firestore');

const Home = () =>{

const [username, setUser] = React.useState('');
const [welcome, setWelcome ] = React.useState(false);
const [imageURI, setImage ] = React.useState('');

const SignOut = () =>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}

useEffect(()=>{
try{
    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot)=>{
        if(snapshot.exists){
            setUser(snapshot.data().name)

        }
        else{
            console.log("does not exist")
        }
    })
    } catch(e)
    {console.log(e.message)}
},[])

useEffect(()=>{
    setTimeout(()=>{
        setWelcome(true);
    }, 2000)
}, [])

return(
<View style = {styles.container}>
    <Text>Home</Text>
    {welcome &&
    <Fragment>
    <Text>Welcome, {username}.</Text>
    {/* <Image source = {{uri: imageURI}} style = {styles.image} /> */}
    </Fragment>
    }

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
    image:{
        width: 180,
        height: 280,
    },
})
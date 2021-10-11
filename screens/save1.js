import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, TextInput, Image, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView} from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')
import {useNavigation} from '@react-navigation/native';
import { setProfilePic } from '../reduxFolder/actions/index.js';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './home.js';


function save({PImage, setProfilePic}){

const [caption, setCaption] = useState('');
const [isUploading, setLoading ] = useState(false);
const navigation = useNavigation();

//Originally, the app was using props to pass image, but the program doesn't pass the image taken immediately. Instead, it passes the image that was previously taken before.
//That's why when the application first boots up and the user take the image, there is no image showing on save1 screen.
//That's because no image was taken previously.
//Now I am using Redux Store to pass the image

const uploadPhoto = async () =>{
    const childPath = `users/${firebase.auth().currentUser.uid}/example/profilePic`;

    //This function stores the path of the profile pic file into firestore, which can be retrieved later when the app boots up.
    setProfilePicPath(childPath);

   // const uri = props.route.params.image;
   setLoading(true);
   const uri = PImage;
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase
        .storage()
        .ref()
        .child(childPath)
        .put(blob)

    const taskProgress = snapShot =>{
        console.log(`transferred: ${snapShot.bytesTransferred}`)
    }
    const taskError = snapshot =>{
        console.log(snapshot)
    }

    //9/22/21 I was getting error undefined is not an object (evaluating 'task.snapShot.ref') until I put all letters in snapshot in lower case.
    const taskCompleted = () =>{
    try{
        task.snapshot.ref.getDownloadURL().then((snapshot) =>{
           savePostData(snapshot);
            console.log(snapshot)
        })
        }catch(e){
            console.log(e.message)
        }
    }
    try{
        task.on("state_changed", taskProgress, taskError, taskCompleted);

    }catch(e){
        console.log(e.message)
    }

}

//This component saves the path of the profile pic once the 'upload photo' button is clicked
//Thus, for certain screens to display the image, it utilizes functions to retrieve the path and use the path to retrieve the photo, which is then stored in redux.
const setProfilePicPath = (childPath)=>{
    firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({
        profilePicPath: childPath,
    })
}

const savePostData = (downloadURL)=>{
firebase.firestore()
.collection('posts')
.doc(firebase.auth().currentUser.uid)
.collection('userPosts')
.add({
    downloadURL,
    caption,
    likes: 0,
    creationDate: firebase.firestore.FieldValue.serverTimestamp(),
}).then(() =>{
    setLoading(false);
    alert('Profile pic is saved')
    setProfilePic();
    navigation.navigate('Home');
})

}

return(
<View style = {styles.container}>
<View style = {styles.imageContainer}>
    <ImageBackground
        source = {{uri: PImage}}
        style = {{
                width: WinWidth,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333333',
        }}
    >
        {isUploading ?
        <View style = {{alignItems: 'center', justifyContent: 'center', width: WinWidth}}>
            <Text style = {{color: '#fff'}}>Uploading Photo</Text>
            <ActivityIndicator size = 'large' color = "#fff"/>
        </View>
        :        <View style = {{alignItems: 'center', justifyContent: 'center', width: WinWidth}}>
        </View>
        }
    </ImageBackground>
</View>
    <Text>Write down a caption for this image</Text>
    <TextInput
        value = {caption}
        placeholder = 'Your Caption'
        onChangeText = {caption => setCaption(caption)}
        style = {styles.textInput}
    />
    <View style = {styles.buttonContainer, {marginTop: 15,}}>
        <TouchableOpacity onPress = {uploadPhoto}>
            <View style = {styles.button}>
            <Text style = {{
                color: '#fff',
                padding: 5,
            }}>Upload Photo</Text>
            </View>
        </TouchableOpacity>
    </View>
    <View style = {styles.buttonContainer, {marginTop: 15,}}>
        <TouchableOpacity onPress = {() => navigation.goBack()}>
            <View style = {styles.button}>
            <Text style = {{
                color: '#fff',
                padding: 5,
            }}>Go Back</Text>
            </View>
        </TouchableOpacity>
    </View>
</View>
)
}

const mapStatetoProps = store =>{
return{
    PImage: store.cameraR.image,
    }
}

const mapDispatchtoProps = dispatch => bindActionCreators({setProfilePic}, dispatch);
export default connect (mapStatetoProps, mapDispatchtoProps)(save);

const WinWidth = Dimensions.get('window').width * 0.75;

const styles = StyleSheet.create({
body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',

},
button:{
    backgroundColor: '#e37a0a',
    borderRadius: 25,
    width: 150,
    alignItems: 'center',
},
buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
},
camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: WinWidth,
},
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
head:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
image:{
    width: '80%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',

},
imageContainer:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
},
recordIcon:{
    width: '25',
    height: '25',
    justifyContent: 'flex-start',
},
textInput:{
    width: '80%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
},
})
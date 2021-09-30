import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, InputText, TouchableOpacity, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
require('firebase/firebase-storage');
require('firebase/firestore')

function Save ({Pimage}){
const navigation = useNavigation();
const uploadPhoto = async () =>{
const childPath = `users/${firebase.auth().currentUser.uid}/save2/${Math.random().toString(36)}`
const response = await fetch(Pimage)
const blob = await response.blob();
const task = firebase
    .storage()
    .ref()
    .child(childPath)
    .put(blob)

const taskProgress = snapshot =>{
    console.log(`Transferred: ${snapshot.bytesTransferred}`)
    }
const taskError = snapshot =>{
    console.log(snapshot)
}
const taskCompleted = snapshot =>{
    task.snapshot.ref.getDownloadURL().then(snapshot =>{
        console.log(snapshot)
    })
    }

task.on('state_changed', taskProgress, taskError, taskCompleted);
}

return(
    <View style = {styles.container}>
        <View style = {{fontWeight: 'bold', fontSize: 25}}><Text>Save2.js</Text></View>
         <Image
            source = {{uri: Pimage}}
            style = {styles.image}
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

const mapStatetoProps = store =>({
    Pimage: store.cameraR.image,
})

export default connect(mapStatetoProps, null)(Save);


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
recordIcon:{
    width: '25',
    height: '25',
    justifyContent: 'flex-start',
},
})
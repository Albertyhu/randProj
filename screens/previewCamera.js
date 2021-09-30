import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import {CameraContext} from '../component/CameraContext.js';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {setCameraImage, reset, fill, saveData, setProfilePic } from '../reduxFolder/actions/index.js';
import {goBack} from '@react-navigation/native';

import firebase from 'firebase';
require ('firebase/database')
require ('firebase/firebase-storage')
require('firebase/firestore')

import Home from './home.js';

//purpose of this page: To display the image that is taken on  the add.js page
class PreviewCamera extends React.Component{
state={
    caption: '',
}
componentDidMount(){
    this.props.fill();
}

savePost(downloadURL, caption){
firebase.firestore()
.collection('post')
.doc(firebase.auth().currentUser.uid)
.collection('userPosts')
.add({
    downloadURL,
    caption,
    likesCount: 0,
    creation: firebase.firestore.FieldValue.serverTimestamp(),
})
.then(()=>{
    this.props.setProfilePic(downloadURL);
    this.props.navigation.popToTop()
})

}

render(){
const {image} = this.props;
const {test} = this.props;
const {currentName} = this.props;
   if(test === null || image === null){
    return(
        <View></View>
    )
    }

const defaultImage = () =>{
this.props.reset();
}
/*
const handleSave = async () =>{
await saveData(currentName, 'profilePic', image)
this.props.navigation.navigate('Home')
console.log('image saved')
}*/

const handleSave = () =>{
    firebase
    .database()
    .ref('users/' + currentName)
    .update({
        profilePic: image,
    })

this.props.navigation.navigate('Home')
console.log('image saved')
}

const uploadPhoto = async () =>{
    const childPath = `users/${firebase.auth().currentUser.uid}/profilePic`
    const response = await fetch(image);
    const blob = await response.blob();
    const task  = firebase
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
    const taskCompleted = () =>{
        task.snapshot.ref.getDownloadURL().then((snapshot)=>{
            this.savePost(snapshot, this.state.caption);
            console.log(snapshot);
        })
    }

    try{
        task.on("state_changed", taskProgress, taskError, taskCompleted);
        setTimeout(()=>{alert('Photo is uploaded')}, 3000)

    }catch(e){
        console.log(e.message)
    }
}

return(
<View style = {styles.container}>
    <Image
        source = {{uri: image,}}
        style = {styles.image}
    />

    <Text>Write down a caption for this image</Text>
    <TextInput
        value = {this.state.caption}
        placeholder = 'Your Caption'
        onChangeText = {caption => this.setState({caption})}
        style = {styles.textInput}
    />
        <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress = {uploadPhoto}>
                    <View style = {styles.button}>
                    <Text style = {{
                        color: '#fff',
                        padding: 5,
                    }}>Upload Image</Text>
                    </View>
                </TouchableOpacity>
            </View>
    <View style = {styles.buttonContainer}>
            <TouchableOpacity onPress = {() => {this.props.navigation.goBack()}}>
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
}

//how do i test to see if this works?
//store and retrieve something simpler like a text string
//use console.log
const mapStateToProps = (store) =>({
       image: store.cameraR.image,
       test: store.cameraR.testString,
       currentName: store.userState.currentUser.name
})

const mapDispatchToProps = (dispatch) => bindActionCreators({setCameraImage, reset, fill, saveData, setProfilePic}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PreviewCamera);

const WinWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
image:{
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
},
textInput:{
    width: '80%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
},
})
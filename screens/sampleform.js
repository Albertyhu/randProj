import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
require('firebase/database')
require('firebase/firestore')
require('firebase/auth')
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveData} from '../reduxFolder/actions/index.js';

const SampleForm = ({currentUser, currentName, saveData}) =>{
const [country, setCountry] = React.useState('')
const userName = currentName;
const handleCountry = val => {
    setCountry(val);
}

//this works
/*
const handleSubmit = () =>{
    firebase
    .database()
    .ref('users/' + currentName)
    .update({
        country: country,
        email: currentUser.email,
     })
console.log("Information saved: " + country);
}*/

return(
<View style = {styles.container}>
    <View style = {[styles.inputContainer, {marginTop: 20}]}>
    <Text>Type in your country of origin: {country}</Text>
        <View style = {styles.row}>
            <TextInput
                value = {country}
                onChangeText = {handleCountry}
                placeholder = "Please, type in your country"
                style = {styles.textInput}
            />
        </View>
        <View style = {[styles.buttonContainer, {marginTop: 20}]}>
            <TouchableOpacity onPress = {() =>saveData(userName, 'country', country)}>
                <View style = {styles.button}>
                <Text style = {{
                    color: '#fff',
                    padding: 5,
                }}>Submit</Text>
                </View>
            </TouchableOpacity>
        </View>
        <Text>You are logged in as {currentName}</Text>
    </View>
</View>
)
}

const mapStatetoProps = value =>({
    currentUser: value.userState.currentUser,
    currentName: value.userState.currentUser.name,
})
const mapDispatchtoProps = dispatch => bindActionCreators({saveData}, dispatch)
export default connect(mapStatetoProps, mapDispatchtoProps)(SampleForm);

const styles = StyleSheet.create({
container:{
    backgroundColor: '#23B525',
    alignItems: 'center',
    flex: 1,
},
body:{
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    flex: 2,
    width: '100%',
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
buttonText:{
    color: '#fff',
    fontSize: 20,
    paddingLeft: 10,
},
facebook:{
    alignItems: 'center',
    backgroundColor: '#3b5998',
    borderRadius: 25,
    flexDirection: 'row',
},
socialText:{
    fontSize: 10,
    padding: 10,
},
google:{
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#000',
    flexDirection: 'row',
},
header:{
    flex: 1,
},
icon: {
    padding: 5,
},
inputContainer:{
    alignItems: 'center',
},
row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    width: '95%',
},
signUp:{
    alignItems: 'center',
    marginTop: 10,

},
signUpButton:{
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
},
signUpText:{
    color: '#000',
    fontSize: 20,
    paddingLeft: 10,

},
socialContainer:{
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    },
subTitle:{
    fontSize: 20,
    color: '#000',
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginLeft: 20,
},
textInput:{
    width: '80%',
},
title: {
    color: '#fff',
    fontSize: 25,
    marginVertical: 20,
},
})
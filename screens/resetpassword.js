import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { sendPasswordReset } from '../component/firebasemethods.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

export default function resetPassword ({navigation}){
const [data, setData] = React.useState({
    email: '',
    isValid: false,
});

const [error, setErrMess] = React.useState(false);

const isEmailValid = () =>{
    const arr = data.email.split('@');
    if(arr.length >=2 && arr[1]){
        const arr2 = arr[1].split('.')
        if(arr2.length >= 2 && arr2[1]){
            //arr3 checks if there are spaces in the user's input
            const arr3 = data.email.trim().split(' ');
            if(arr3.length < 2 && arr3[0]){
                setData({
                    ...data,
                    isValid: true,
                })
            }
            else{
                 setData({
                     ...data,
                     isValid: false,
                 })
            }
        }
        else{
             setData({
                 ...data,
                 isValid: false,
             })
        }
    }
    else{
         setData({
             ...data,
             isValid: false,
         })
    }
}

const handleEmail = val =>{
    setData({
        ...data,
        email: val,
    })
}

const handleSubmit = ()=>{
    if(data.isValid){
        sendPasswordReset(data.email)
        alert('Email has been sent.')
    }
    else{
        setErrMess(true);
    }
}

useEffect(()=>{
    isEmailValid();
    setErrMess(false);
}, [data.email])


return(
    <View style = {styles.container}>
        <Text style = {styles.title}>Type your email here.</Text>
        <View style = {styles.inputContainer}>
       <Icon name = 'mail-outline' size = {25} color = '#23B525' style = {styles.icon} />
        <TextInput
            style = {styles.input}
            placeholder = 'Email'
            value = {data.email}
            onChangeText = {handleEmail}
            autoCapitalize = {'none'}
        />
            {data.isValid ?
                <Icon name = 'checkmark-circle-outline' size = {25} color = '#1BAC1E' style = {[styles.icon, {alignSelf: 'flex-end'}]} />
                :
               <Icon name = 'checkmark-circle-outline' size = {25} color = '#B6B6B6' style = {[styles.icon, {alignSelf: 'flex-end'}]} />
            }
        </View>
        <Text style = {styles.subtitle}>
            You will get an email to reset your password.
        </Text>
        { data.displayErr &&
            <Text style = {styles.error}>
                Error: Email format is not valid. Please, retype it.
            </Text>
        }

     <TouchableOpacity style = {styles.buttonContainer} onPress = {handleSubmit}>
         <LinearGradient colors = {['#fd560a', '#fb8c00']}  style = {styles.button}>
            <Text style = {styles.buttonText}>Reset Password</Text>
            <Icon name = 'chevron-forward-outline' size = {25} color = '#fff' style = {styles.icon} />
         </LinearGradient>
     </TouchableOpacity>
      <TouchableOpacity onPress = {()=>{navigation.navigate.goBack()}} style = {styles.cancel}>
         <View style = {styles.cancelButton}>
             <Text style = {styles.cancelText}>Cancel</Text>
             <Icon name = 'chevron-forward-outline' style = {styles.icon} color = '#000' size = {25} />
         </View>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
button:{
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
},
buttonContainer:{
    alignItems: 'center',
    marginTop: 30,
},
buttonText:{
    color: '#fff',
    fontSize: 20,
    paddingLeft: 10,
},
cancel:{
    alignItems: 'center',
    marginTop: 30,

},
cancelButton:{
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
},
cancelText:{
    color: '#000',
    fontSize: 20,
    paddingLeft: 10,

},
container:{
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#23B525',
    justifyContent: 'center',
},
error: {
    color: '#d81e0c',
},
icon:{
    padding: 10,
},
input:{
    width: '75%',
    padding: 10,
},
inputContainer:{
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#fff',
    width: '90%',
},
subtitle:{
    marginVertical: 10,
},
title:{
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
},
})
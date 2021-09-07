import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, PermissionsAndroid, Button, TextInput, TouchableOpacity } from 'react-native'
import * as Animated from 'react-native-animatable';
import Feather from 'react-native-feather';
import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import firebase from 'firebase'
require('firebase/auth');

import SignUp from './SignUp.js';
import { SocialButton } from '../component/SocialIcon.js';
import {signIn} from '../component/firebasemethods.js';
import Home from './home.js';

const SignIn = ({navigation}) =>{

const [data, setData] = React.useState({
    email: '',
    password: '',
    isValid: false,
    secureData: true,
})

const handleEmail = val =>{
    setData({
        ...data,
        email: val,
    })
}

const handlePass = val =>{
    setData({
        ...data,
        password: val,
    })
}

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

const toggleSecure = () =>{
    setData(prevState =>({
        ...data,
        secureData: !prevState.secureData,
    }))
}

const handleSubmit = () =>{
    isEmailValid();
    const email = data.email.trim();
    if(data.isValid){
        firebase.auth().signInWithEmailAndPassword(email, data.password)
          .then((userCredential) => {
            var user = userCredential.user;
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    }
    else{
        alert('Either email or password is invalid.')
    }
}

useEffect(()=>{
isEmailValid();
}, [data.email])

return(
<View style = {styles.container}>
    <View styles = {styles.header}>
    <Text style = {styles.title}>Sign In</Text>
    </View>
    <Animated.View style = {styles.body}
        animation = 'fadeInUp'
        delay = {1000}
    >
    <Text style = {[styles.subTitle, {marginTop: 50,}]}>Email</Text>
    <View style = {styles.inputContainer}>
        <View style = {styles.row}>
            <Icon name = 'mail-outline' size = {25} color = '#23B525' style = {styles.icon} />
            <TextInput
                value = {data.email}
                onChangeText = {handleEmail}
                placeholder = 'Type your email here'
                style = {styles.textInput}
            />
             {data.isValid ?
                    <Icon name = 'checkmark-circle-outline' size = {25} color = '#1BAC1E' style = {[styles.icon, {alignSelf: 'flex-end'}]} />
                    :
                   <Icon name = 'checkmark-circle-outline' size = {25} color = '#B6B6B6' style = {[styles.icon, {alignSelf: 'flex-end'}]} />
                }
          </View>
     </View>
    <Text style = {[styles.subTitle, {marginTop: 15,}]}>Password</Text>
    <View style = {styles.inputContainer}>
        <View style = {styles.row}>
            <Icon name = 'key' size = {25} color = '#23B525' style = {styles.icon} />
            <TextInput
                value = {data.password}
                onChangeText = {handlePass}
                placeholder = 'Type your password here'
                style = {styles.textInput}
                secureTextEntry = {data.secureData}
            />
             {data.secureData ?
                    <Icon name = 'eye-off' size = {25} color = '#1BAC1E' style = {[styles.icon, {alignSelf: 'flex-end'}]} onPress = {toggleSecure}/>
                    :
                   <Icon name = 'eye' size = {25} color = '#1BAC1E' style = {[styles.icon, {alignSelf: 'flex-end'}]} onPress = {toggleSecure}/>
                }
          </View>
     </View>

     <TouchableOpacity style = {styles.buttonContainer} onPress = {handleSubmit}>
         <LinearGradient colors = {['#23B525', '#1e901f']}  style = {styles.button}>
            <Text style = {styles.buttonText}>Sign In</Text>
            <Icon name = 'chevron-forward-outline' size = {25} color = '#fff' style = {styles.icon} />
         </LinearGradient>
     </TouchableOpacity>
    <View style = {{alignItems: 'center', marginTop: 15,}}>
         <Text>
            Don't have an account?
         </Text>
     </View>
     <TouchableOpacity onPress = {()=>{navigation.navigate('SignUp')}} style = {styles.signUp}>
        <View style = {styles.signUpButton}>
            <Text style = {styles.signUpText}>Sign Up</Text>
            <Icon name = 'chevron-forward-outline' style = {styles.icon} color = '#000' size = {25} />
        </View>
     </TouchableOpacity>
     <View style = {styles.socialContainer}>
         <SocialButton
         type = 'facebook'
         backgroundColor = '#3b5998'
         color = '#fff'
         text = 'Sign in with Facebook'
         eventPress = ''
         size = {25}
         border = {false}
         />
         <SocialButton
         type = 'google'
         backgroundColor = '#fff'
         color = '#000'
         text = 'Sign in with Google'
         eventPress = ''
         size = {25}
         border = {true }
         />
      </View>
    </Animated.View>
</View>
)
}

export default SignIn;

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
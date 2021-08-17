import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import * as Animated from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {SocialButton} from '../component/SocialIcon.js';

const SignUp = () =>{
const [data, setData] = React.useState({
    email: '',
    password: '',
    confirmPass: '',
    isValid: false,
    passValid: false,
    secureData: false,
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

const handleConfirmPass = val =>{
    setData({
        ...data,
        confirmPass: val,
    })
}

const isEmailValid = () =>{
    var arr = data.email.split('@');
    if(arr.length >=2 && arr[1]){
        const arr2 = arr[1].split('.');
        if(arr2.length >= 2 && arr2[1]){
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

const toggleSecure = () =>{
    setData(prevState =>({
        ...data,
        secureData: !prevState.secureData,
    }))
}

function validatePassword (){
    if(data.password.length >= 4 && data.password.trim() === data.confirmPass.trim()){
        setData({
            ...data,
            passValid: true,
        })
    }
    else{
        setData({
            ...data,
            passValid: false,
        })
    }
}

const createAccount = () =>{
    if(data.isValid && data.passValid){
        alert('Account created!')
    }
    else if(!data.isValid && data.passValid){
        alert('Error: Email format is not valid.')
    }
    else if(data.isValid && !data.passValid){
        alert('Error: Passwords entered are not the same or password is not long enough. The password needs to be at least 4 characters long.')
    }
    else if (!data.isValid && !data.passValid){
        alert('Error: Email format is not valid. \n Passwords entered are not the same or password is not long enough. The password needs to be at least 4 characters long.')
    }

}

useEffect(()=>{
isEmailValid();
}, [data.email])

useEffect(()=>{
validatePassword();
}, [data.confirmPass, data.password])


return(
<SafeAreaView style = {styles.container}>
<ScrollView style = {{width: '100%',}}>
<View style = {styles.head} >
    <Text style = {styles.title}>Create a new account</Text>
</View>
<Animated.View
    animation = 'fadeInUp'
    delay = {1000}
style = {styles.body}>

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
                 autoCapitalize = 'none'
             />
              {data.secureData ?
                     <Icon name = 'eye-off' size = {25} color = '#1BAC1E' style = {[styles.icon, {alignSelf: 'flex-end'}]} onPress = {toggleSecure}/>
                     :
                    <Icon name = 'eye' size = {25} color = '#1BAC1E' style = {[styles.icon, {alignSelf: 'flex-end'}]} onPress = {toggleSecure}/>
                 }
           </View>
      </View>
      <Text style = {[styles.subTitle, {marginTop: 15,}]}>Confirm Your Password</Text>
     <View style = {styles.inputContainer}>
         <View style = {styles.row}>
             <Icon name = 'key' size = {25} color = '#23B525' style = {styles.icon} />
             <TextInput
                 value = {data.confirmPass}
                 onChangeText = {handleConfirmPass}
                 placeholder = 'Type your password here again for confirmation'
                 style = {styles.textInput}
                 secureTextEntry = {data.secureData}
                 autoCapitalize = 'none'
             />
              {data.passValid ?
                    <Icon name = 'checkmark-circle-outline' size = {25} color = '#1BAC1E' style = {[styles.icon, {alignSelf: 'flex-end'}]} />
                    :
                    <Icon name = 'checkmark-circle-outline' size = {25} color = '#B6B6B6' style = {[styles.icon, {alignSelf: 'flex-end'}]} />
                 }
           </View>
      </View>
       <TouchableOpacity onPress = {createAccount} style = {styles.buttonContainer}>
           <LinearGradient colors = {['#23B525', '#1e901f']}  style = {styles.button}>
              <Text style = {styles.buttonText}>Sign Up</Text>
              <Icon name = 'chevron-forward-outline' size = {25} color = '#fff' style = {styles.icon} />
           </LinearGradient>
       </TouchableOpacity>
       <View style = {{alignItems: 'center', marginTop: 15,}}>
            <Text>
               Already a member?
            </Text>
        </View>
         <TouchableOpacity onPress = {()=>{navigation.navigate('SignUp')}} style = {styles.signIn}>
            <View style = {styles.signInButton}>
                <Text style = {styles.signUpText}>Sign In</Text>
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
</ScrollView>
</SafeAreaView>
)
}

export default SignUp;
const styles = StyleSheet.create({
body:{
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    flex: 8,
    width: '100%',
},
container:{
    backgroundColor: '#23B525',
    alignItems: 'center',
    flex: 1,
},
head:{
    flex: 1,
    alignItems: 'center',
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
signIn:{
    alignItems: 'center',
    marginTop: 10,

},
signInButton:{
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
    marginVertical: 30,
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
    marginVertical: 30,
},
})
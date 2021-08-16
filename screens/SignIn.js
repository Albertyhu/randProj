import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, PermissionsAndroid, Button, TextInput, TouchableOpacity } from 'react-native'
import * as Animated from 'react-native-animatable';

const SignUp = () =>{
return(
<View style = {styles.container}>
<Animated.View style = {styles.body}>

</Animated.View>
</View>
)
}

const styles = StyleSheet.create({
container:{
    backgroundColor: '#6EA561',
    flex: 1,
    alignItems: 'center',
},
body:{
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
},
})
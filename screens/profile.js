import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button } from 'react-native'

const Profile = () =>{
return(
<View style = {styles.container}>
    <Text>Profile</Text>
</View>
)
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
})
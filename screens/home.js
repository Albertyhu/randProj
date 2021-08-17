import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button } from 'react-native'

const Home = () =>{
return(
<View style = {styles.container}>
    <Text>Home</Text>
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
})
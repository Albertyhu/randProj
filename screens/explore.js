import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, PermissionsAndroid, Button } from 'react-native'


export default function Explore(){
return(
<View style = {styles.container}>
 <Text>Explore Screen</Text>
</View>
)
}

const styles = StyleSheet.create({
container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
},
})
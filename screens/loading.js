import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Animate from 'react-native-animatable';

const Loading = () =>{
return(
<View style = {styles.container}>
    <ActivityIndicator size = {100} color = '#fff'/>
    <Animate.Text
        animation = 'bounce'
        style = {styles.text}
        iterationCount = {'infinite'}
    >
        Loading. Please, wait.
    </Animate.Text>
</View>
)
}

export default Loading;

const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: '#23B525',
    alignItems: 'center',
    justifyContent: 'center',
},
text:{
    color: '#fff',
    fontSize: 25,
},
})

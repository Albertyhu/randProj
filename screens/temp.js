import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

import {GenerateToken, genLetter } from '../component/tokenGenerator.js';

export default function display () {
const [letter, setLetter] = React.useState('');

const generate = () => {
    const token = GenerateToken(4);
    setLetter(token)
}

return(
    <View style = {styles.container}>
        <Text style = {{fontSize: 25,}}>{letter}</Text>
        <Button title = 'Generate' onPress = {generate} />
    </View>
)
}

const styles = StyleSheet.create({
container:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
},
})
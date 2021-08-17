import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SocialButton = ({type, size, backgroundColor, color, text, eventPress, border, ...rest}) =>{
const visibleBorder = {
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: backgroundColor,
}

const nonVisibleBorder = {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: backgroundColor,
}
const customBorder = border ? visibleBorder : nonVisibleBorder;

return(
<TouchableOpacity onPress = {eventPress}>
    <View style = {customBorder}>
    <Icon name = {type} style = {styles.icon} size = {22}  color = {color} />
    <Text style = {[styles.buttonText, {color: color}]}>{text}</Text>
    </View>
</TouchableOpacity>
)
}

const styles = StyleSheet.create({
button:{
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
    justifyContent: 'center',
},
buttonText: {
    padding: 10,
},
icon:{
    paddingLeft: 10,
},
})
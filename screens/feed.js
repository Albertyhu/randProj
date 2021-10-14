import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Image, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Animated from 'react-native-animatable';

//Notice on the View component, I wrote in key = {item.id}
//This is to resolve the error, missing keys for items
const renderItem = ({item}) =>{
return(
    <View>
        <Text>Name: {item.name}</Text>
        <Text>Email: {item.email}</Text>
    </View>
)
}

//currently, targetProfileList which is supposed to contain an array of all target profiles being followed is returning as an empty array

const Feed = props =>{
const [display, setDisplay] = useState(false);
const {targetProfileList} = props;
useEffect(()=>{
    setTimeout(()=>{
        setDisplay(true)
    }, 1000)
}, [])
return(
    display ?
    <View style = {styles.container}>
        <Text>Feed Screen </Text>
        <FlatList
            data = {targetProfileList}
            renderItem = {renderItem}
            keyExtractor = {(item, index) => index.toString()}
        />
    </View>
    :
    <View style = {styles.container}>
        <Animated.Text
            animation = 'bounce'
            iterationCount = {'infinite'}
            style = {styles.loadingText}
        >Loading
        </Animated.Text>
        <ActivityIndicator size = 'large' color = "#000" />
    </View>
)
}

const mapStatetoProps = store =>({
    targetProfileList: store.usersState.users,
})

export default connect(mapStatetoProps, null)(Feed);


const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    loadingText:{
        color: '#000',
        fontSize: 25,
    },
})
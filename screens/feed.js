import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Image, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Animated from 'react-native-animatable';
import ImageModal from 'react-native-image-modal';
import {useNavigation} from '@react-navigation/native';

import Comments from './comments.js';

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

const renderPosts = ({item}, props) =>{

return(
<View style = {{marginVertical: 20,}}>
    <View style = {[styles.contentContainer]}>
        <Text style = {{fontWeight: 'bold'}}>{item.name}</Text>
        <TouchableOpacity onPress = {
            ()=>props.navigation.navigate('Comments', {
            postID: item.id,
            userID: item.userID,
            picURL: item.downloadURL,
            caption: item.caption,
            targetName: item.name,})}>
        <Image
            style={styles.image}
            resizeMode = 'cover'
             source = {item.downloadURL ? {uri: item.downloadURL} : null}
            />
        </TouchableOpacity>
        {/*
        <TouchableOpacity style = {styles.buttonContainer} onPress = {
        ()=>props.navigation.navigate('Comments', {
        postID: item.id,
        userID: item.userID,
        picURL: item.downloadURL,
        caption: item.caption,
        targetName: item.name,})}>
            <View style = {styles.button}>
                <Text style = {styles.buttonText}>Comment</Text>
            </View>
        </TouchableOpacity>*/}
    </View>
    <View style = {{flex: 1, marginVertical: 15, paddingLeft: 10, }}>
        <Text>Posted on {item.creationDate.toDate().toLocaleString()} </Text>

    </View>
</View>
)
}

//currently, targetProfileList which is supposed to contain an array of all target profiles being followed is returning as an empty array

const Feed = props =>{
const {targetProfilePosts} = props;
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
            numColumns = {1}
            horizontal = {false}
            data = {targetProfilePosts}
            renderItem = {(item) => renderPosts(item, props)}
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
    targetProfilePosts: store.usersState.posts,

})


export default connect(mapStatetoProps, null)(Feed);

const WinWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    button:{
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#34E5FF',
    },
    buttonContainer:{
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText:{
        color: '#fff',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingRight: 10,
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    contentContainer: {
        alignItems: 'center',
        height: 300,
        marginTop: 20
    },
    image:{
       //aspectRatio only works if Flatlist has numColumns set to more than one
      //  aspectRatio: 1/1,
        flex: 1,
        width: WinWidth,
        height: '100%',
        margin: 5,
        position: 'relative',
    },
    loadingText:{
        color: '#000',
        fontSize: 25,
    },
})
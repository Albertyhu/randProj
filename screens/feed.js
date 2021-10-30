import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, Text, TextInput, Image, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Animated from 'react-native-animatable';
import ImageModal from 'react-native-image-modal';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
require('firebase/firestore');
import {replaceStoreLikers} from '../reduxFolder/actions/index.js';

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

//needs work
//idea: pass useState elements to renderPosts
//handle firebase operations in main functional component.
function renderPosts({item}, props, likersArray, likeState, setLikeStatus, addLiker, removeLiker){
const currentUserID = firebase.auth().currentUser.uid;

/*
//Originally, this function created to gather like status of each post from firestore
//Eventually, I decided not to use this because the app takes time to gather the data from firestore
//It's better to gather all the data when the app initially loads to improve User Experience
const checkLikeStatus = () =>{
    firebase.firestore()
    .collection('posts')
    .doc(item.userID)
    .collection('userPosts')
    .doc(item.id)
    .collection('likes')
    .get()
    .then(snapshot => {
        snapshot.docs.forEach(val =>{
             let postID = item.id;
             let letter = {
                [postID]: null,
             }
            if(val.id === currentUserID){
                letter[postID] = true;
                setLiked([...isLiked, letter[postID]])
            }
            else{
                letter[postID]= false;
               setLiked([...isLiked, letter[postID]])
            }
        })
    })
   //console.log(isLiked[`${item.id}`]
}
*/
   const post_id = item.id
   let like_status = ({
        [post_id]: false,
   })

//I tried to use the method of passing functions through context
//However, this doesn't work because renderPosts is not considered a function component.
//And I got the error "Invalid Hook call"
/*
if(likersArray.some(val => val[item.id] === currentUserID)){
    addLikertoReducer(item.id, true)

}
else{
    addLikertoReducer(item.id, true)
}*/

const handleLike = () => {
    firebase.firestore()
    .collection('posts')
    .doc(item.userID)
    .collection('userPosts')
    .doc(item.id)
    .collection('likes')
    .doc(currentUserID)
    .set({})

    addLiker(item.id)
}
const handleUnlike = () =>{
    firebase.firestore()
    .collection('posts')
    .doc(item.userID)
    .collection('userPosts')
    .doc(item.id)
    .collection('likes')
    .doc(currentUserID)
    .delete()

    removeLiker(item.id)
}

//checkLikeStatus();

return(
<View style = {{marginVertical: 20,}}>
    <View style = {[styles.contentContainer]}>
        <Text style = {{fontWeight: 'bold'}}>{item.name}</Text>
        <Text>Post ID: {item.id}</Text>
        <View style = {{marginBottom: 10}}>
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
        </View>
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
    <View style = {{flex: 1, marginVertical: 15, paddingLeft: 10, flexDirection: 'row', }}>
        <View style = {styles.buttonContainer}>
        {likeState.likeList.some(val => val[item.id] === currentUserID) ?
            <TouchableOpacity onPress = {handleUnlike}>
                <Icon name = 'heart' size = {40} color = '#dc7c7c' />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress = {handleLike}>
                <Icon name = 'heart-outline' size = {30} color = '#000' />
            </TouchableOpacity>
        }
        </View>
        <Text style = {{padding: 10,}}>Posted on {item.creationDate.toDate().toLocaleString()} </Text>
    </View>
</View>
)
}

//currently, targetProfileList which is supposed to contain an array of all target profiles being followed is returning as an empty array

const Feed = props =>{
const {targetProfilePosts,
    currentUser_ID,
    replaceStoreLikers,
    } = props;
const [display, setDisplay] = useState(false);
const {targetProfileList} = props;
const {likersArray} = props;
const [ isLiked, setLiked ] = useState([]);

const initialState = {
    likeList: [...likersArray],
   // colorInfo: 'red',
}

const [likeState, setLikeStatus] = React.useReducer(likeReducer, initialState);

function likeReducer(likeState = initialState, action){
    switch(action.type){
        case 'ADD':
        return{
           ...likeState,
           likeList: [...likeState.likeList, action.status],
          }
        case 'SET_LIKELIST':
        return{
           ...likeState,
           likeList: [...action.list],
        }
        case 'ERASE':
        return initialState;
    }
}


const removeLiker = (postID) =>{
    const newArray = [...likeState.likeList].filter(val =>val[postID] !== currentUser_ID)
    setLikeStatus({type: 'SET_LIKELIST', list: newArray})
}

const addLiker = (postID) =>{
    const data=({
        [postID]: currentUser_ID,
    })
    setLikeStatus({type: 'ADD', status: data})
}

//I tried to use the method of passing functions through context
//However, this doesn't work because renderPosts is not considered a function component.
//And I got the error "Invalid Hook call"
/*
const feedContext = useMemo(()=>({
addLikertoReducer: (postID, boolval) =>{
    const likeStatus = ({
        [postID]: boolval,
    })
    setLikeStatus({type: 'ADD', status: likeStatus})
},
checkLikes: async () =>{
    targetProfilePosts.forEach(val => {
        console.log(val)
    })
}
}))
*/
const displayTargetPosts = () =>{
    targetProfilePosts.forEach(val => {
        console.log(val)
    })
}

const like = () =>{
    setLiked(true)
}

const unlike = () =>{
    setLiked(false)
}

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
            renderItem = {(item) => renderPosts(item, props, likersArray, likeState, setLikeStatus, addLiker, removeLiker)}
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
    currentUser_ID: store.userState.currentUserID,
    targetProfileList: store.usersState.users,
    targetProfilePosts: store.usersState.posts,
    likersArray: store.usersState.postLikers,
})

const mapDispatchtoProps = dispatch => bindActionCreators({replaceStoreLikers}, dispatch)
export default connect(mapStatetoProps, mapDispatchtoProps)(Feed);

const WinWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    button:{
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#34E5FF',
        position: 'absolute',
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
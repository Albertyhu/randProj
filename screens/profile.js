import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button, FlatList, SafeAreaView, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'
import * as Animated from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {SetFollowers } from '../reduxFolder/actions/index.js';

const renderItem = ({item}) => (
<View style = {styles.containerImage}>
    {item.downloadURL ? <Image
        source = {item.downloadURL ? {uri: item.downloadURL} : null}
        style = {styles.image}
    /> :
        <Text>Image doesn't exist</Text>
    }
 </View>
)

function Profile(props){
    const { currentProfilePic, postArray, currentVisitingID, currentUserName, currentUserID, followingList, SetFollowers} = props;
//Once the app checks which member's profile the current user is on, it fills the profile screen with the appropriate posts
//The following block of was written initially to handle displaying the write photos
//However, it's commented out because it doesn't work right. The photos keep switching back and forth between the photos of the current user
//...and the photos of the target user whose profile is being visited.
//What stopped the bug from occurring is to put the methods into the useEffect hook
//...so every time the profile to be displayed is changed, the hook is called
/*
    const [ data, setData] = useState(
    currentVisitingID ===  currentUserID ?
     {
        user: currentVisitingID,
        posts: postArray,
        mainPic: currentProfilePic,
        username: currentUserName,
        }
        :
    {
        user: null,
        posts: [],
        mainPic: '',
        username: '',
    })

//function for retrieving main profile pic.
const fetchTargetProfile = () =>{
//first, retrieve  the file path for the profile pic that is located in firebase storage
    firebase.firestore()
    .collection('users')
    .doc(currentVisitingID)
    .get()
    .then(snapshot =>{
        if(snapshot.exists){
            setData({
                ...data,
                username: snapshot.data().name,
            })
            firebase.storage()
            .ref()
            .child(snapshot.data().profilePicPath)
            .getDownloadURL()
            .then(snapshot => {
                setData({
                    ...data,
                    mainPic: snapshot,
                })
            })
        }
    })

}

const fetchPosts = () =>{
firebase.firestore()
.collection('posts')
.doc(currentVisitingID)
.collection('userPosts')
.orderBy('creationDate', 'asc')
.get()
.then(snapshot =>{
    const userPosts = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return{id, ...data}

    })

    setData({
        ...data,
        posts: userPosts,
    })
})
}

if(currentVisitingID != firebase.auth().currentUser.uid){
    fetchTargetProfile();
    fetchPosts();
}
*/
const [display, setDisplay] = useState(false);
const [ mainPic, setMainPic ] = useState('')
const [posts, setPosts] = useState([])
const [username, setUsername] = useState('')

//boolean object for determining whether or not the follow buttons should be displayed
const [ displayFollow, setFollow ] = useState(true);

//boolean object for determining whether or not current user is following the target profile
const [isFollowing, setIsFollowing ] = useState(false);
//function for retrieving main profile pic.
const fetchTargetProfile = async (IDvalue) =>{
//first, retrieve  the file path for the profile pic that is located in firebase storage
   await firebase.firestore()
    .collection('users')
    .doc(IDvalue)
    .get()
    .then(async snapshot =>{
        if(snapshot.exists){
            setUsername(snapshot.data().name)
           await firebase.storage()
            .ref()
            .child(snapshot.data().profilePicPath)
            .getDownloadURL()
            .then(snapshot => {
                setMainPic(snapshot)
            })
        }
    })
  await firebase.firestore()
    .collection('posts')
    .doc(IDvalue)
    .collection('userPosts')
    .orderBy('creationDate', 'asc')
    .get()
    .then(snapshot =>{
        const userPosts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return{id, ...data}
        })
        setPosts(userPosts)

    })
}
const ID = currentVisitingID === currentUserID ? currentUserID : currentVisitingID

const onFollow = () =>{
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("CurrentlyFollowing")
    .doc(ID)
    .set({})

    firebase.firestore()
    .collection('users')
    .doc(ID)
    .get()
    .then(snapshot =>{
       alert("You are now following " + snapshot.data().name)
    })
    setIsFollowing(true);

    //this is necessary to update the posts on the conversation feed screen
    SetFollowers();
}

const unFollow = () =>{
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("CurrentlyFollowing")
    .doc(ID)
    .delete()

    firebase.firestore()
    .collection('users')
    .doc(ID)
    .get()
    .then(snapshot =>{
       alert("You have stopped following " + snapshot.data().name)
    })

    setIsFollowing(false)

    //The following doesn't work to remove posts from feed.
    SetFollowers();
}

//If user is on a target profile, this method checks whether or not the current user is following the target profile.
const checkIsFollowing = () =>{
firebase.firestore()
.collection('following')
.doc(firebase.auth().currentUser.uid)
.collection('CurrentlyFollowing')
.onSnapshot(snapshot => {
    let followers = snapshot.docs.map(doc =>{
        const id = doc.id;
        return {id}
    })
/*
// Array.indexOf(val) does not work despite the fact that the tutorial says to do this.
// That's because I structured the object to have 'id' as the key for each property
// So, I used the Array.forEach() method instead. See below.
    if( followers.indexOf(currentVisitingID) > -1){
            console.log("Following")
        setIsFollowing(true)
    }
    else
    {
        console.log('Not following')
        setIsFollowing(false)
     }

     */
    followers.forEach(function(val){
        if(currentVisitingID === val.id){
            setIsFollowing(true);
            }
         else{
            setIsFollowing(false);
         }
    })
})


}

//Putting fetchTargetProfile() in a useEffect hook is necessary to prevent the bug causing the profile from switching back and forth between users
useEffect(()=>{
    setDisplay(false);
    fetchTargetProfile(ID);
    checkIsFollowing();
    setTimeout(()=>{
        setDisplay(true);
    }, 1500)
}, [ID])

return(
display ?
<View style = {styles.container}>
    <Text>{username}'s Profile</Text>
    <View style = {{flex: 1/3, marginBottom: 10,}}>
    <Image
        style = {styles.profileFilePic}
        source = {mainPic ? {uri: mainPic} : null}
    />
    {currentVisitingID != currentUserID ?
        <View style = {styles.buttonContainer}>
        {(isFollowing) ? (
            <TouchableOpacity style = {styles.button} onPress = {unFollow}>
                <Icon name = 'remove-circle-outline' color = '#fff' size = {25} style = {styles.icon}/>
                <Text style = {styles.buttonText}>UnFollow</Text>
            </TouchableOpacity>
        )
        :
        (
            <TouchableOpacity style = {styles.button} onPress = {onFollow}>
                 <Icon name = 'add-outline' color = '#fff' size = {25} style = {styles.icon} />
                 <Text style = {styles.buttonText}>Follow</Text>
            </TouchableOpacity>
       )}
      </View>
    :
        null
    }
    </View>
    <SafeAreaView style = {styles.containerGallery}>
      <FlatList
          numColumns = {3}
          data = {posts}
          horizontal = {false}
          renderItem = {renderItem}
       />
     </SafeAreaView>
</View>
:
<View style = {[styles.container, {justifyContent: 'center'}]}>
    <Animated.Text
        animation = 'bounce'
        iterationCount = {'infinite'}
        style = {styles.loadingText}
    >Loading</Animated.Text>
    <ActivityIndicator size = 'large' color = "#000" />

</View>
)
}

//currentVisitingID is the ID of the profile  that the current user is visiting.
const mapStatetoProps = store =>({
    currentUserID: store.userState.currentUserID,
    currentProfilePic: store.userState.profilePicURL,
    postArray: store.userState.posts,
    currentVisitingID: store.userState.profileVisitID,
    currentProfilePicPath: store.userState.profilePicPath,
    currentUserName: store.userState.username,
    followingList: store.userState.followers,
})

const mapDispatchtoProps = dispatch => bindActionCreators({SetFollowers}, dispatch);

export default connect(mapStatetoProps, mapDispatchtoProps)(Profile);

const WinWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    button:{
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#A8E6CF',
    },
    buttonContainer:{
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText:{
        color: '#fff',
        fontSize: 20,
        paddingLeft: 5,
        paddingRight: 15,
    },
    container:{
        alignItems: 'center',
        flex: 1,
    },
   containerGallery: {
        flex: 1/2,
        width: WinWidth,
        alignItems: 'center',
    },
   containerImage:{
   },
   icon: {
       padding: 5,
   },
    image:{
        aspectRatio: 1/1,
        flex: 1,
        width: 100,
        height: 100,
        margin: 5,

    },
    profileFilePic:{
        width: WinWidth * 0.9,
        height: '90%',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
        width: '95%',
    },
    loadingText:{
        color: '#000',
        fontSize: 25,
    },
})
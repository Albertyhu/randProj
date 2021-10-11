import React, {useEffect, Fragment, useMemo} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, clearData, fetchProfilePic, setProfilePic } from '../reduxFolder/actions/index.js';
import {AuthContext} from '../component/AuthContext.js';
import * as Animated from 'react-native-animatable';

import firebase from 'firebase';
require ('firebase/auth');
require ('firebase/firestore');

class Home extends React.Component{
constructor(props){
    super(props);
    this.state = {
        profilepicurl: '',
    };

}

componentDidMount(){
  //  this.props.fetchUser();

 //9/29/21: The following is no longer in use since I changed the way profile pic is fetched
 // this.props.fetchProfilePic();
}

render(){
const { currentUser } = this.props;
const { ProPicURI } = this.props;
const { ProPicPath } = this.props;
const { ProPicURL } = this. props;

   //fetchProfilePic(currentUser.name);
    //I don't understand why this line has to be inside the render
    // this seems similar to the following code:
    // const {signIN} = useContext(AuthContext}
    // this is how data and functions get passed around from one file to another.
    if(currentUser === null){
    return(
        <View style = {styles.container}>
        <Animated.Text
            animation = 'bounce'
            iterationCount = 'infinite'
        >
        Loading...
        </Animated.Text>
        </View>
    )
    }

//Using the path information for the profile pic that is acquired in the save1.js file, this function retrieves download URL for the profile pic
//With the downloadURL, use the Image component to display it with source{{uri: downloadURL}}
//This no longer is in use since I changed the function to retrieve both the path of the pic and its download url, which is now stored in redux.
const  profilePic = async () =>{
    await firebase.storage()
    .ref()
    .child(ProPicPath)
    .getDownloadURL()
    .then(snapshot=>{
        if(snapshot.exists){
         this.setState({ profilepicurl: snapshot});
         }
         else{
            console.log('Profile picture does not exist.')
         }
    })
}

//no longer in use
//  profilePic();

return(

    <View style = {styles.container}>
        <Text>Welcome back, {currentUser.name}</Text>
        <Image
            source = { ProPicURL ? {uri: ProPicURL } : {uri: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png'}}
            style = {styles.image}
        />
    </View>
)
}
}

const mapStateToProps = (val) =>({
       currentUser: val.userState.currentUser,
       ProPicPath: val.userState.profilePicPath,
       ProPicURI: val.cameraR.image,
       ProPicURL: val.userState.profilePicURL,
})
//replaced 'store' with val

const mapDispatchToProps = (val) => bindActionCreators({fetchUser, clearData, fetchProfilePic, setProfilePic}, val)
//replaced 'dispatch' with val

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    image:{
        width: 180,
        height: 180,
        borderRadius: 180,
    },
})
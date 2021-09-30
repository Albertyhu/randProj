import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button } from 'react-native'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Profile = (props) =>{
const { profilePic, postArray } = props;
return(
<View style = {styles.container}>
    <Text>Profile</Text>
</View>
)
}

const mapStatetoProps = store =>({
    profilePic: store.cameraR.image,
    postArray: store.userState.posts,
})

export default connect(mapStatetoProps, null)(Profile);

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})
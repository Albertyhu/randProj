import React, {useEffect, Fragment} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, clearData } from '../reduxFolder/actions/index.js';
import {AuthContext} from '../component/AuthContext.js';


import firebase from 'firebase';
require ('firebase/auth');
require ('firebase/firestore');

/*
const Home = () =>{

const [username, setUser] = React.useState('');
const [welcome, setWelcome ] = React.useState(false);
const [imageURI, setImage ] = React.useState('');

const SignOut = () =>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}

useEffect(()=>{
try{
    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot)=>{
        if(snapshot.exists){
            setUser(snapshot.data().name)

        }
        else{
            console.log("does not exist")
        }
    })
    } catch(e)
    {console.log(e.message)}
},[])
*/
/*
useEffect(()=>{
    setTimeout(()=>{
        setWelcome(true);
    }, 2000)
}, [])


const {currentUser} = store;
return(
<View style = {styles.container}>
    <Text>Home</Text>
    {welcome &&
    <Fragment>
    <Text>Welcome, {username}.</Text>

    </Fragment>
    }

    <Button title = 'Sign Out' onPress = {SignOut} />
</View>
)
}*/


class Home extends React.Component{
componentDidMount(){
    this.props.fetchUser();
}

render(){
const { currentUser } = this.props;
    //I don't understand why this line has to be inside the render
    // this seems similar to the following code:
    // const {signIN} = useContext(AuthContext}
    // this is how data and functions get passed around from one file to another.
    if(currentUser === null){
    return(
        <View></View>
    )
    }
return(
    <View style = {styles.container}>
        <Text>Welcome back, {currentUser.name}</Text>
    </View>
)
}
}

const mapStateToProps = (val) =>({
       currentUser: val.userState.currentUser
})
//replaced 'store' with val

const mapDispatchToProps = (val) => bindActionCreators({fetchUser, clearData}, val)
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
        height: 280,
    },
})
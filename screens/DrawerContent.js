import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerItem, createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Paragraph,
        Caption,
        Divider,
        Drawer,
        Subheading,
        Headline,
        Switch,} from 'react-native-paper';
import firebase from 'firebase';
require ('firebase/auth');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setName, fetchUser } from '../reduxFolder/actions/index.js';

import Home from './home.js';
import Explore from './explore.js';
import Profile from './profile.js';
import EditProfile from './EditProfile.js';
import AddProfile from './add.js';
import Search from './search.js';

function DrawerContent(props){
    const {ProPicURL, username, email } = props;
    const SignOut = () =>{
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    }

/*
    useEffect(()=>{
        console.log(ProPicURL ? ProPicURL : "URL doesn't exist")
    }, [])
*/
return(
<DrawerContentScrollView {...props}>
    <Drawer.Section>
    <Image
        source = {ProPicURL ? {uri: ProPicURL}  : {uri: 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png'}}
        style = {styles.image}
    />
      <View style = {[styles.row, {marginLeft: 20}]}>
          <Text style = {{fontWeight: 'bold'}}>User: </Text>
          <Text>{username}</Text>
      </View>
       <View style = {[styles.row, {marginLeft: 20}]}>
           <Text style = {{fontWeight: 'bold'}}>Email: </Text>
           <Text>{email}</Text>
       </View>
    </Drawer.Section>
    <Drawer.Section>
    <DrawerItem
        label = {({focused, color }) => <Text style = {{color: '#000' }}>Home</Text> }
        onPress = {()=> props.navigation.navigate('Home')}
        icon = {({color, size }) => <Icon name = 'home-outline' size = {size} color = {color} />}
        activeTintColor = '#fff'
        style = {styles.drawerItem}
        />
     <DrawerItem
         label = {({focused, color }) => <Text style = {{color: '#000' }}>Explore</Text> }
         onPress = {()=> props.navigation.navigate('Explore')}
         icon = {({color, size }) => <Icon name = 'navigate-circle-outline' size = {size} color = {color} />}
         activeTintColor = '#fff'
         style = {styles.drawerItem}
         />
     <DrawerItem
         label = {({focused, color }) => <Text style = {{color: '#000' }}>Profile</Text> }
         onPress = {()=> props.navigation.navigate('Profile')}
         icon = {({color, size }) => <Icon name = 'ios-person' size = {size} color = {color} />}
         activeTintColor = '#fff'
         style = {styles.drawerItem}
         />
      <DrawerItem
          label = {({focused, color }) => <Text style = {{color: '#000' }}>Edit</Text> }
          onPress = {() => props.navigation.navigate('EditProfile')}
          icon = {({color, size}) => <Icon name = 'pencil-outline' color = '#000' size = {size} />}
      />
        <DrawerItem
            label = {({focused, color }) => <Text style = {{color: '#000' }}>Add</Text> }
            onPress = {() => props.navigation.navigate('AddProfile')}
            icon = {({color, size}) => <Icon name = 'add-outline' color = '#000' size = {size} />}
        />
        <DrawerItem
            label = {({focused, color }) => <Text style = {{color: '#000' }}>Search</Text> }
            navigation={props.navigation}
            onPress = {() => props.navigation.navigate('Search')}
            icon = {({color, size}) => <Icon name = 'search-outline' color = '#000' size = {size} />}
        />
    </Drawer.Section>
    <Divider />
    <Drawer.Section>
        <DrawerItem
            label = {({focused, color }) => <Text style = {{color: '#000' }}>Sign Out</Text> }
            icon = {({color, size}) => <Icon name = 'exit-outline' size = {25} color = '#000' />}
            onPress = {SignOut}
        />
    </Drawer.Section>
</DrawerContentScrollView>

    )
}

const styles = StyleSheet.create({
container: {},
drawerItem: {},
image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
},
row:{
    flexDirection: 'row',
},
})

const mapDispatchtoProps = dispatch => bindActionCreators({setName, fetchUser}, dispatch);

const mapStatetoProps = store =>{
return{
    ProPicURL: store.userState.profilePicURL,
    username: store.userState.username,
    email: store.userState.email,
}}

export default connect (mapStatetoProps, mapDispatchtoProps)(DrawerContent);

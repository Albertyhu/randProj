import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
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
import Home from './home.js';
import Explore from './explore.js';
import Profile from './profile.js';
import EditProfile from './EditProfile.js';

export function DrawerContent(props){
    const SignOut = () =>{
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    }


return(
<DrawerContentScrollView {...props}>
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
})
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { openDrawer } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import Search from './search.js';

const SearchStack = createStackNavigator();
class SearchStackClass extends React.Component{


render(){
const {navigation} = this.props;
    return(
    <SearchStack.Navigator>
        <SearchStack.Screen name = 'SearchStack'
        component = {Search}
        navigation = {this.props.navigation}
        options ={{
             title: "Preview Image",
             headerLeft: () => <Icon.Button
                 name = 'ios-menu'
                 color = '#000'
                 size = {25}
                 onPress = {() => navigation.openDrawer()}
                 style = {styles.iosMenu}
             />,
          }}/>
    </SearchStack.Navigator>
)
}
}

export default SearchStackClass;

const styles = StyleSheet.create({
    iosMenu:{
      paddingLeft: 10,
      backgroundColor: '#fff',
    },
})
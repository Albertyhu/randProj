import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView  } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
require('firebase/firestore');
import { useNavigation } from '@react-navigation/native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Visit_ProfileID} from '../reduxFolder/actions/index.js';

import Profile from './profile.js';
import RootTabs from './RootTabs.js';

function Search(props){

const {Visit_ProfileID} = props;
const [users, setUsers ] = useState([]);
const [displaySearch, setDisplay ] = useState(false);

const handleSubmit = val =>{
    Visit_ProfileID(val)
    props.navigation.navigate('Profile');
}

const renderItem = ({item}) =>(
    <TouchableOpacity
        onPress = {() => handleSubmit(item.id)}
        style = {{ marginVertical: 15,}}>
    <View>
        <Text>{item.name}</Text>
    </View>
    </TouchableOpacity>

    )

    const fetchUsers = async (search) => {
        await firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .get()
        .then((snapshot) =>{
             let usersR = snapshot.docs.map(doc =>{
               const data = doc.data();
               const id = doc.id;
               return{id, ...data}
        })
         setUsers(usersR)
        }
        )
    }

return(
<View style = {styles.container}>
<View style = {styles.row}>
    <Icon name = "search-outline" size = {25} style = {styles.icon} />
    <TextInput
        placeholder = "Type name here"
        onChangeText = {val => {
            fetchUsers(val);
            if(val.length > 0)
                setDisplay(true);
            else
                setDisplay(false);

        }}
        style = {styles.textInput}
    />
 </View>
 <SafeAreaView style = {styles.listContainer}>
 {displaySearch ?
    <FlatList
         numColumns = {1}
         horizontal = {false}
         data = {users}
         renderItem = {renderItem}
         style = {styles.list}
     />
     : null
     }
  </SafeAreaView>
</View>
)
}

const mapDispatchtoProps = dispatch => bindActionCreators({Visit_ProfileID}, dispatch)

export default connect(null, mapDispatchtoProps)(Search);

const WinWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    icon:{
        padding: 15,
    },
    list:{
        alignSelf: 'flex-start',
        /*
         borderLeftWidth: 1,
         borderRightWidth: 1,
         borderBottomWidth: 1,
         borderColor: '#000',
            */
    },
    listContainer:{
        alignSelf: 'flex-start',
        marginLeft: 18,
        height: 'auto',
    },
    row:{
        marginVertical: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
        width: WinWidth * 0.9,
    },
    searchResults:{

    },
    textInput:{
        width: '100%',
    },
})
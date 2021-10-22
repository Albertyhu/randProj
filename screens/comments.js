import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Image, ImageBackground, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, Keyboard } from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import firebase from 'firebase';
require('firebase/firestore');

const renderItem = ({item}) =>{
return(
    <View style = {styles.commentContainer}>
    <View style = {{flexDirection: 'row'}}>
        <Text style = {{fontWeight: 'bold'}}>{item.creatorName}</Text>
        <Text style = {{fontStyle: 'italic'}}> replied on {item.datePosted.toDate().toDateString()}</Text>
    </View>
        <Text style = {{fontStyle: 'italic'}}>{item.datePosted.toDate().toTimeString()}</Text>
        <Text>{item.comment}</Text>
    </View>
    )
}

const Comments = props =>{

const {username} = props;

const [comment, setComment ] = useState('');
const [displayCaption, setCaption ] = useState(false);
const [ posts, setPosts ] = useState([])
const [displayKeyboard, setDisplayKey ] = useState(false);
const [displayPosts, setDisplayPosts] = useState(false);
const commentHandler = val =>{
    setComment(val);
}

//This method fetches the followed users' posts and the comments made on them
const fillPosts = () => {
firebase.firestore()
    .collection('posts')
    .doc(props.route.params.userID)
    .collection('userPosts')
    .doc(props.route.params.postID)
    .collection('comment')
    .orderBy('datePosted', 'asc')
    .get()
    .then(snapshot => {
        const tempPost = snapshot.docs.map(doc => {
            const id = doc.id;
            const data = doc.data();
            return{...data, id}
            }
            )

//If there are no comments on the post, don't display the FlatList, and vice versa.
        if(tempPost.length === 0){
            setDisplayPosts(false)
            }
       else{
            setDisplayPosts(true)
            }

//Update the post
       setPosts(tempPost);
    })

}

const handleSubmit = () =>{
    firebase.firestore()
    .collection('posts')
    .doc(props.route.params.userID)
    .collection('userPosts')
    .doc(props.route.params.postID)
    .collection('comment')
    .add({
        creator: firebase.auth().currentUser.uid,
        creatorName: username,
        comment,
        datePosted: firebase.firestore.Timestamp.now(),
    })
    .then(
        alert('Your comment has been sent.')

    )
    //closes the keyboard after the user hits 'send' button
    Keyboard.dismiss();

    //update the flatlist
    fillPosts();

    //reinitialize state variable comment to contain nothing
    setComment('');

}

useEffect(() =>{
    fillPosts();
}, [])

return(
<View style = {styles.container}>
        <Text style = {{fontWeight: 'bold'}}>{props.route.params.targetName}</Text>
        {props.route.params.caption ?
            <Text>{props.route.params.caption}</Text>
            :
            null
        }
       {/* <Text>Post ID: {props.route.params.postID}</Text>*/}
        <Image
            source = {{uri: props.route.params.picURL}}
            style = {styles.image}
         />
       {displayPosts ?
         <View style = {styles.flatlistContainer}>
        <FlatList
            data = {posts}
            renderItem = {renderItem}
            numColumns = {1}
            horizontal = {false}
            keyExtractor = {(item, index) => index.toString()}
            style = {styles.flatlist}
        />
        </View>
        :
        null
        }
        <KeyboardAvoidingView>
            <TextInput
                placeholder = 'Comment'
                value = {comment}
                onChangeText = {commentHandler}
                style = {styles.commentInput}
            />
        </KeyboardAvoidingView>
        <TouchableOpacity style = {styles.buttonContainer} onPress = {handleSubmit}>
            <View style = {styles.button}>
                <Text style = {styles.buttonText}>Send</Text>
            </View>
        </TouchableOpacity>

</View>
)
}

const mapStatetoProps = store => ({
    username: store.userState.username,
})

export default connect(mapStatetoProps, null)(Comments);

const WinWidth = Dimensions.get('window').width;
const WinHeight = Dimensions.get('window').height;

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
        marginBottom: 10,

    },
    buttonText:{
        color: '#fff',
        fontSize: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingVertical: 5,
    },
    commentContainer: {
        marginVertical: 10,
    },
    commentInput:{
        borderRadius: 5,
        borderColor: '#d5d5d5',
        borderWidth: 1,
        width: WinWidth * 0.9,
        padding: 5,
        marginVertical: 5,

    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    flatlist:{
        marginVertical: 5,
        borderColor: '#d5d5d5',
        borderRadius: 5,
        width: WinWidth * 0.9,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    flatlistContainer:{
        flex: 1,
    },
    image:{
        width: 300,
        height: 150,
    },

})
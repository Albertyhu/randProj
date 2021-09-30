import { USER_STATE_CHANGE,
USER_POSTS_STATE_CHANGE,
USER_FOLLOWING_STATE_CHANGE,
USERS_DATA_STATE_CHANGE,
USERS_POSTS_STATE_CHANGE,
USERS_LIKES_STATE_CHANGE,
CLEAR_DATA,
RESET_IMAGE,
FILL,
SET_IMAGE,
SET_NAME,
SET_POSTS,
SET_PROFILEPIC,
SET_PROFILEPICURL,
} from '../constants/index'

import firebase from 'firebase'
require('firebase/firestore')
require('firebase/database')
require('firebase/firebase-storage')

//keyword dispatch is necessary

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: FILL, name: snapshot.data().name, mail: snapshot.data().email, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchUserPosts() {
    return ((dispatch) => {
      firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .orderBy('creationDate', 'asc')
        .get()
        .then((snapshot) =>{
            const posts = snapshot.doc.map( doc =>{
                const data = doc.data();
                const id = doc.id;
                return{id, ...data}
            }
        )
             dispatch({type: SET_POSTS, post: snapshot})
         })


    })
}

export function setName(){
        return ((dispatch) => {
            firebase.firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        dispatch({ type: SET_NAME, name: snapshot.data().name })
                    }
                    else {
                        console.log('does not exist')
                    }
                })
        })
}

export function clearData(){
    return ((dispatch) => {
        dispatch({ type: CLEAR_DATA })
    })
}

//camera functions
export const setCameraImage = val =>{
    return((dispatch) =>{
        dispatch({type: SET_IMAGE, image: val})
    }
    )
}

export const reset = () =>{
    return((dispatch) =>{
    dispatch({type: RESET_IMAGE})
    }
    )
}

export const fill = () => {

    return((dispatch) =>{
        dispatch({type: "FILL", text: "This is an example"})
    })
}

//value of key will be a string
export const saveData = (name, key, val) =>{
 return((dispatch)=>{
        firebase
        .database()
        .ref('users/' + name)
        .update({
            [key]: val,
         })

    console.log("Information saved: " + val);
})
}

export function fetchProfilePic(){
    return((dispatch) =>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
            if(snapshot.exists){
                dispatch({type: SET_PROFILEPIC, path: snapshot.data().profilePicPath})
                }
            else{
                console.log('Profile Picture does not exist')
            }
        })
        }
    )
}

export function setProfilePic(){
    return((dispatch) =>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
            if(snapshot.exists){
                firebase.storage()
                .ref()
                .child(snapshot.data().profilePicPath)
                .getDownloadURL()
                .then(snapshot =>{
                    dispatch({type: SET_PROFILEPICURL, url: snapshot})
                })
                }
            else{
                console.log('Profile Picture does not exist')
            }
        })
        }
    )
}
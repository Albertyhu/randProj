import { USER_STATE_CHANGE,
USER_POSTS_STATE_CHANGE,
USER_FOLLOWING_STATE_CHANGE,
USERS_POSTS_STATE_CHANGE,
USERS_LIKES_STATE_CHANGE,
CLEAR_DATA,
CLEAR_USERS_DATA,
RESET_IMAGE,
FILL,
SET_IMAGE,
SET_NAME,
SET_POSTS,
SET_PROFILEPIC,
SET_PROFILEPICURL,
VISIT_PROFILE,
FETCH_FOLLOWERS,
ADD_TARGET,
COLLECT_TARGET_POSTS,
} from '../constants/index'

import firebase from 'firebase'
require('firebase/firestore')
require('firebase/database')
require('firebase/firebase-storage')

//keyword dispatch is necessary

export function fetchUser() {
    return ((dispatch) => {
        const userID = firebase.auth().currentUser.uid;
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: FILL, name: snapshot.data().name, mail: snapshot.data().email, currentUser: snapshot.data(), id: userID})
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
        if(snapshot.exists){
            //notice that docs is plural in the following line
            const posts = snapshot.docs.map( doc =>{
                const data = doc.data();
                const id = doc.id;
//                console.log(data.likes)
                return{id, ...data}
            }
         )
             dispatch({type: SET_POSTS, post: posts})
         }
         else{
             console.log('User posts do not exist.')
         }
         }
         )
    })
}

//stores username into redux store
//This is not necessary since fetchUser() already accomplishes this
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

//clears data about individual user
export function clearUserData(){
    return ((dispatch) => {
        dispatch({ type: CLEAR_DATA })
    })
}

//clears users data
export function clearUsersStateData(){
    return ((dispatch) => {
        dispatch({ type: CLEAR_USERS_DATA })
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

//Note: When retrieving data from firebase storage, snapshot.exist doesn't work. It returns undefined.
export function setProfilePic(){
    return((dispatch) =>{
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
            if(snapshot.data().profilePicPath != undefined){
                firebase.storage()
                .ref()
                .child(snapshot.data().profilePicPath)
                .getDownloadURL()
                .then(snapshot =>{
                    if(snapshot != undefined){
                      dispatch({type: SET_PROFILEPICURL, url: snapshot})
                    }
                    else{
                        console.log('Profile pic has not been uploaded yet.')
                    }
                })
                }
            else{
                console.log('Profile Picture does not exist')
            }
        })
        }
    )
}

//Temporary function for identifying the profile to be visited
export function Visit_ProfileID(val){
    return(dispatch => {
        dispatch({type: VISIT_PROFILE, id: val})
    })
}

//There is an error that shows up when user logs out.
//Uncaught Error in snapshot listener:, [FirebaseError: Missing or insufficient permissions.]
//This is caused by the fact that the app has not detached the onSnapshot listener
/*
export function SetFollowers(){
    return(dispatch =>{
        var unsubscribe = firebase.firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('CurrentlyFollowing')
        .onSnapshot(snapshot =>{
            const allFollowers = snapshot.docs.map(doc =>{
                const id = doc.id;
                return{id}
            })
            dispatch({type: FETCH_FOLLOWERS, followerArray: allFollowers, });
            for(let i = 0; i < allFollowers.length; i++){
                dispatch(AddFollowerToList(allFollowers[i].id))
            }
        }, error=>{
            console.log('onSnapshot Error in SetFollowers: ')
            console.log(error);
        })

      //this method doesn't work to detach the onSnapshot listener.
        unsubscribe();
    })
}
*/

//Alternative version of SetFollwers()
//This time, it doesn't use the onSnapshot method and instead uses get() to retrieve the necessary data
//The error "missing permissions" caused by the onSnapshot listener not being detached no longer occurs when the user signs out.
export function SetFollowers(){
    return(dispatch =>{
        firebase.firestore()
        .collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('CurrentlyFollowing')
        .get()
        .then(snapshot =>{
            const allFollowers = snapshot.docs.map(doc =>{
                const id = doc.id;
                return{id}
            })
            dispatch({type: FETCH_FOLLOWERS, followerArray: allFollowers, });
            for(let i = 0; i < allFollowers.length; i++){
                dispatch(AddFollowerToList(allFollowers[i].id))
            }
        })
    })
}

//Adds the target profile to the redux store list of profiles, which will be used later to display users' posts onto a feed
export function AddFollowerToList(uid){
    return((dispatch, getState) =>{
        //first, check to see if the target profile is already in the redux store list
        // If found is undefined, run th next block of code
        const found = getState().usersState.users.find(val => val.uid === uid)
        if(!found){
            firebase.firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then(snapshot =>{
                if(snapshot.exists){
                     const targetUser = snapshot.data();
                     targetUser.uid = snapshot.id;
                    dispatch({type: ADD_TARGET, user: targetUser})
                }
                else{
                    console.log('User does not exist')
                }
            })
        }
    })
}
/*
export function CollectTargetPosts(uid){
    firebase.firestore()
    .collection('posts')
    .doc(uid)
    .collection('userPosts')
    .orderBy('creationDate', 'asc')
    .get()
    .then(snapshot =>{
        console.log(snapshot)
    })
}*/
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
} from '../constants/index'

import firebase from 'firebase'
require('firebase/firestore')

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
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
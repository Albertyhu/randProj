import {CLEAR_USERS_DATA, ADD_TARGET, COLLECT_TARGET_POSTS, SET_TARGET_POSTS, SET_POST_LIKERS, ADD_POST_LIKERS} from '../constants';

const initialState = {
    users: [],
    followerLoaded: 0,
    posts: [],
    postLikers: [],
}

export const users = (state = initialState, action) =>{
switch(action.type){
   case ADD_TARGET:
        return{
            ...state,
            followerLoaded: state.followerLoaded + 1,
            users: [...state.users, action.user],
        }
    case COLLECT_TARGET_POSTS:
        return{
            ...state,
            posts: [...state.posts, ...action.allPosts],
        }
    case SET_TARGET_POSTS:
        return{
            ...state,
            posts: [...action.allPosts],
        }
    case CLEAR_USERS_DATA:
        return initialState;
    case SET_POST_LIKERS:
        return {
            ...state,
            postLikers: [...action.likers],
        }
     case ADD_POST_LIKERS:
         return {
             ...state,
             postLikers: [ ...state.postLikers, ...action.likers],
         }
    default:
        return state;

}
}
import {CLEAR_USERS_DATA, ADD_TARGET, COLLECT_TARGET_POSTS} from '../constants';

const initialState = {
    users: [],
    followerLoaded: 0,
    posts: [],
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
    case CLEAR_USERS_DATA:
        return initialState;
    default:
        return state;

}
}
import React from 'react';

import { USER_STATE_CHANGE, CLEAR_DATA, SET_NAME, SET_POSTS, SET_PROFILEPIC, SET_PROFILEPICURL, FILL, VISIT_PROFILE, FETCH_FOLLOWERS } from '../constants';

const initialState = {
    currentUser: null,
    currentUserID: '',
    posts: [],
    following: [],
    profilePicPath: '',
    profilePicURL: '',
    username: '',
    email: '',
    profileVisitID: '',
    followers: [],
}

export const user = (state = initialState, action) =>{
    switch(action.type){
        case USER_STATE_CHANGE:
            return{
                ...state,
                currentUser: action.currentUser,
            }
         case CLEAR_DATA:
            return initialState;
         case SET_NAME:
            return{
                ...state,
                username: action.name,
            }

         case SET_POSTS:
             return{
                ...state,
                posts: action.post,
             }

         case SET_PROFILEPIC:
            return{
                ...state,
                profilePicPath: action.path,
            }
         case SET_PROFILEPICURL:
            return{
                ...state,
                profilePicURL: action.url,
            }
         case FILL:
            return{
                ...state,
                username: action.name,
                email: action.mail,
                currentUser: action.currentUser,
                currentUserID: action.id,

            }
         case VISIT_PROFILE:
            return{
                ...state,
                profileVisitID: action.id,
            }
         case FETCH_FOLLOWERS:
            return{
                ...state,
                followers: action.followerArray,
            }
         default:
            return state;
    }
}


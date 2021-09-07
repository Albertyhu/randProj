import {CLEAR_DATA, USERS_DATA_STATE_CHANGE} from '../constants';

const initialState = {
    users: [],

}

export const users = (state = initialState, action) =>{
switch(action.type){
    case USERS_DATA_STATE_CHANGE:
        return{
            ...state,
            users: [...state.users, action.user],
        }
    case CLEAR_DATA:
        return initialState;
    default:
        return state;

}
}
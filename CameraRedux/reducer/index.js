import React from 'react';
import {SET_IMAGE, DISPLAY_IMAGE, RESET_IMAGE, FILL} from '../constants/index';
import {combineReducers} from 'redux';

const Reduction = combineReducers({
    cameraReduced: CameraReducer,
})

export default Reduction;

const initialState = {
    image: 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg',
    testString: 'testing123',
}

export const CameraReducer = (state = initialState, action) =>{
switch(action.type){
    case RESET_IMAGE:
        return initialState;
    case SET_IMAGE:
        return{
        ...state,
        image: action.image,
        }
    case FILL:
        return{
          ...state,
          testString: action.text,
        }
     default:
        return state;
}
}
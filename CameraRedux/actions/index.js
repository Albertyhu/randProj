import React from 'react';
import {RESET_IMAGE, DISPLAY_IMAGE, FILL} from '../constants/index.js';

export function setCameraImage(val){
    return((dispatch) =>{
        dispatch({type: DISPLAY_IMAGE, image: val})
    }
    )
}

export function reset(){
    return((dispatch) =>{
    dispatch({type: RESET_IMAGE})
    }
    )
}

export function fill(){
    return((dispatch) =>{
        dispatch({type: FILL, text: "This is an example"})
    })
}
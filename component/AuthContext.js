import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase';
require('firebase/auth')

export const AuthContext = React.createContext();
export const FeedContext = React.createContext();
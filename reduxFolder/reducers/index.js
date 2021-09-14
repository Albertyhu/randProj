import {combineReducers} from 'redux';
import {user} from './user.js';
import {users} from './users.js';
import {cameraReducer } from './cameraUser.js';

const Reducers = combineReducers({
    userState: user,
    usersState: users,
    cameraR: cameraReducer,
})

export default Reducers;
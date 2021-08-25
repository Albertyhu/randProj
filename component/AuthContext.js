import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase';
require('firebase/auth')

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);

return(
<AuthContext.Provider
value = {{
    user,
    setUser,
    login: async (email, password)=>{
        try{
             await auth().signInWithEmailAndPassword(email, password)
        }catch(e){
            alert(e)
        }

    },
    logout: async () =>{
        try{
            await auth().signOut();
        } catch(e){
            alert(e);
        }
    },
    register: async (email, password) =>{
        try{
            await auth().createUserWithEmailAndPassword(email, password)
        } catch(e){
            alert(e)
        }
    },

    }}
    >
    {children}
    </AuthContext.Provider>
)
}
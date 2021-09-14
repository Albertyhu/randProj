import React, {createRef} from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';

class CameraComponent extends React.Component{
const [cameraRef, setCamera] = React.useState(null);
const [cameraType, setType ] = React.useState(Camera.Constants.Type.front);
ref = createRef();
render(){
return(
<Camera
    ref = {ref => setCamera(ref)}
    style = {styles.camera}
    type = {cameraType}
    ratio = {'1:1'}
    autoFocus = {false}
    >
</Camera>

)
}
}

export default withNavigationFocus(CameraComponent);

const WinWidth =  Dimensions.get('window').width * 0.75;

const styles = StyleSheet.create({
camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: WinWidth,
},
})
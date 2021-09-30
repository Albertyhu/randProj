import React, {useEffect, createRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator, Image } from 'react-native';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Animated from 'react-native-animatable';
import {useIsFocused} from '@react-navigation/native';
import {CameraContext} from '../component/CameraContext.js';
import SampleForm from './sampleform.js';

//redux imports
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {setCameraImage, reset, setPrevImage} from '../reduxFolder/actions/index.js';

import previewCamera from './previewCamera.js';
import Save from './save1.js';

const Add = ({navigation, previewImage, test, setCameraImage, setPrevImage}) =>{

//useIsFocused() is necessary in order to keep the camera running; Without it, when the user switches from this screen to the another screen, then back to this screen again,
//the camera stops running.
const isFocused = useIsFocused();
const [cameraPermission, setCameraPermission ] = React.useState(null)
const [ microphonePermission, setMicrophonePermission ] = React.useState(null);
const [cameraType, setType ] = React.useState(Camera.Constants.Type.front);
const [image, setImage] = React.useState(null);
const [cameraRef, setCamera] = React.useState(null);
const [loading, setLoading ] = React.useState(false);
const [video, setVideo] = React.useState(null);
const [isRecording, setRecording ] = React.useState(false);
const ref = createRef();

useEffect(()=>{
   try{
    (async ()=>{
        const {status} = await Camera.requestPermissionsAsync();
        setCameraPermission(status === 'granted')
        })();
   } catch(e){
        console.log(e.message)
   }
     try{
      (async ()=>{
          const {status} = await Camera.requestMicrophonePermissionsAsync();
          setMicrophonePermission(status === 'granted')
          })();
     } catch(e){
          console.log(e.message)
     }
}, [])

useEffect(()=>{
    if(isRecording){
        record();
    }
    else{
    try {async () => await cameraRef.stopRecording();
        } catch(e){
            console.log(e.message)
        }
    }
}, [isRecording])


const displayCameraComponent = () =>{
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

if (cameraPermission === null) {
return <View />;
}
if (cameraPermission === false) {
return <Text>No access to camera</Text>;
}


if (microphonePermission === false) {
return <Text>Can't record because application lacks access to audio</Text>;
}

//skipProcessing allows the images to be taken faster.
const cameraOptions = ({
    quality: 1,
    skipProcessing: true,
    mirror: true,
})

const videoOptions = {
    maxDuration: 5,
}

const record = async () =>{
try{
if(cameraRef){
    const recording = await cameraRef.recordAsync(videoOptions);
}
}catch(e){
    console.log(e.message);
}
setRecording(false);
}

//Method 1. This stores the image into redux store and then navigates to previewCamera page
/*
const takePhoto = async () =>{
if(cameraRef){
isLoading();
const imageURI = await cameraRef.takePictureAsync(cameraOptions);

setCameraImage(imageURI.uri);
navigation.navigate('previewCamera');
}
}*/

//Method 2
const takePhoto = async () =>{
if(cameraRef){
isLoading();
const imageURI = await cameraRef.takePictureAsync(cameraOptions);

setCameraImage(imageURI.uri);
setImage(imageURI.uri)
//navigation.navigate('Save', {image});
navigation.navigate('Save');
}
}


const toggleRecording = () => {
    setRecording(prevState => ({isRecording: !prevState.isRecording}))
}

const toggleFlip = () =>{
    setType( cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
}

const isLoading = () =>{
    setLoading(true);
    setTimeout(()=>{
        setLoading(false)
    }, 1000)
}

//const {test} = props;
   if(test === null){
    return(
        <View style = {styles.container}>
            <Text>test is null</Text>
        </View>
    )
    }

return(
<View style = {styles.container} >
<View style = {styles.head}>
{isFocused &&
<Camera
    ref = {ref => setCamera(ref)}
    style = {styles.camera}
    type = {cameraType}
    ratio = {'1:1'}
    autoFocus = {false}
    >
</Camera>
}
</View>
<View style = {styles.body}>
<View style = {styles.buttonContainer}>
        <TouchableOpacity onPress = {toggleRecording}>
            <View style = {styles.button}>
            <Text style = {{
                color: '#fff',
                padding: 5,
            }}>Record</Text>
            </View>
        </TouchableOpacity>
    </View>
    <View style = {styles.buttonContainer}>
        <TouchableOpacity onPress = {takePhoto}>
            <View style = {styles.button}>
            <Text style = {{
                color: '#fff',
                padding: 5,
            }}>Take Photo</Text>
            </View>
        </TouchableOpacity>
    </View>
    <View style = {styles.buttonContainer}>
        <TouchableOpacity onPress = {toggleFlip}>
            <View style = {styles.button}>
            <Text style = {{
                color: '#fff',
                padding: 5,
            }}>Flip Camera</Text>
            </View>
        </TouchableOpacity>
    </View>
    <View style = {styles.buttonContainer}>
        <TouchableOpacity onPress = {() => {navigation.navigate('SampleForm')}}>
            <View style = {styles.button}>
            <Text style = {{
                color: '#fff',
                padding: 5,
            }}>SampleForm</Text>
            </View>
        </TouchableOpacity>
    </View>
    <Text>Message: {test}</Text>
{/*image &&
<ImageBackground
    source = {{uri: image}}
    style = {styles.image}>
    {loading && <ActivityIndicator color = "#0000ff"  size = 'large' />}
    </ImageBackground>
*/}

</View>
</View>
)
}

//To accommodate functional components, mapStateToProps function must be written like this.
// Then pass deconstructed variables 'previewImage' and 'test' to the arguments of the function Add()
const mapStateToProps = store =>{
return{
       previewImage: store.cameraR.image,
       test: store.cameraR.testString,
}
}
const mapDispatchToProps = (dispatch) => bindActionCreators({setCameraImage, reset, setPrevImage}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Add);

const WinWidth =  Dimensions.get('window').width * 0.75;

const styles = StyleSheet.create({
body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',

},
button:{
    backgroundColor: '#e37a0a',
    borderRadius: 25,
    width: 150,
    alignItems: 'center',
},
buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
},
camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: WinWidth,
},
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
head:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
image:{
    width: '80%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
},
recordIcon:{
    width: '25',
    height: '25',
    justifyContent: 'flex-start',
},
})
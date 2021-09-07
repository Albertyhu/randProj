import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Image, ImageBackground } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import firebase  from 'firebase';
require ('firebase/auth');
require("firebase/firestore")
//require("firebase/firebase-storage")


const EditProfile = ({navigation}) =>{

const [profilePic, setProfilePic] = React.useState('https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png')
const [isOpen, setPos ] = React.useState(false);
const [data, setData] = React.useState({
    userName: '',
    email: '',
    password: '',
    confirmPass: '',
    country: '',
})

const openSheet = () =>{
    setPos(true);

}
const closeSheet = () =>{
    setPos(false);
}

const handleUsername = val =>{
    setData({
        ...data,
        userName: val,
    })
}

const handleEmail = val =>{
    setData({
        ...data,
        email:  val,
    })
}

const handlePassword = val =>{
    setData({
        ...data,
        password:  val,
    })
}

const handleConfirmPass = val =>{
    setData({
        ...data,
        confirmPass: val,
    })
}

const handleCountry = val =>{
    setData({
        ...data,
        country: val,
    })
}

/*Code for blurring the background when bottom sheet is up*/
let onBlur = useSharedValue(false)

const blurBackground = () =>{
    onBlur.value = true;
}

const sharpenBackground = () =>{
    onBlur.value = false;
}

const opacityChange = useAnimatedStyle(()=>{
return{
    opacity: withSpring(onBlur.value ? 0.1 : 1.0)
}
})

let thisRef = React.createRef(null)
const fall = useSharedValue(0)

//code for image picker
const pickImage = async () => {
let result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
});

if(!result.cancelled){
    setProfilePic(result.uri)
    closeSheet();
}
}

const launchCamera = async () => {
let result = await ImagePicker.launchCameraAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
});
if(!result.cancelled){
    setProfilePic(result.uri)
    closeSheet();
}
}

const renderContent = () =>{
return(
    <View style = {[styles.contentContainer]}>
        <TouchableOpacity onPress = {pickImage}>
            <View style = {styles.sheetButton}>
                <Text style = {styles.buttonText}>Upload Photo</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {launchCamera}>
            <View style = {styles.sheetButton}>
                <Text style = {styles.buttonText}>Take Photo</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {closeSheet}>
            <View style = {styles.sheetButton}>
                <Text style = {styles.buttonText}>Cancel</Text>
            </View>
        </TouchableOpacity>
    </View>
)
}

const renderHeader = () =>{
return(
    <View style = {styles.header}>
        <View style = {styles.headerBar}/>
    </View>
)
}

const renderBackground = () =>{
    <View>
    </View>
}

//this kind of works
const savePhoto = async () =>{
    try{
    firebase.firestore()
       .collection('users')
       .doc(firebase.auth().currentUser.uid)
       .collection('photo')
       .add({
        profile: profilePic,
       })

        .then(
            alert("Photo has been saved")
        )

    }catch(e){
        alert(e.message)
    }
}

const toggleSheet = () =>{
    setPos(isOpen => !isOpen)
}

useEffect(()=>{
    if(isOpen){
        thisRef.current.snapTo(0);
        blurBackground();
    }
    else{
        thisRef.current.snapTo(1);
        sharpenBackground();
    }
}, [isOpen])


return(
<View style = {styles.container}>
    <BottomSheet
        ref = {thisRef}
        snapPoints = {['60%', 50]}
        initialSnap = {0}
        renderContent = {renderContent}
        renderHeader = {renderHeader}
        enabledGestureInteraction = {true}

        /*This following line of code is necessary to make the buttons work*/
        enabledContentGestureInteraction={false}

        enabledBottomInitialAnimation = {true}
        onOpenEnd = {openSheet}
        onCloseEnd = {closeSheet}
        style = {{flexGrow: 1, backgroundColor: '#fff', }}

    />
<Animated.View style = {opacityChange}>
<ScrollView>
        <View style =  {styles.container}>
        <ImageBackground source = {{uri: profilePic}} style = {styles.profilePic}>
            <TouchableOpacity onPress = {toggleSheet}>
                <Image source={require('../assets/white_camera_icon.png')} />
            </TouchableOpacity>
        </ImageBackground>
        </View>
        <View>
        <TouchableOpacity onPress = {savePhoto}>
            <View style = {styles.button}>
                <Text style = {styles.buttonText}>Save Photo</Text>
            </View>
        </TouchableOpacity>
        </View>
</ScrollView>
</Animated.View>

</View>
)

}
export default EditProfile;

const styles = StyleSheet.create({
button:{
    width: 250,
    backgroundColor: '#F36300',
    borderRadius: 15,
    alignItems: 'center',
},
buttonText:{
    color: '#fff',
    fontSize: 25,
    padding: 10,
},
cameraIcon:{
    width: 150,
    height: 150,
    zIndex: 1,
},
container:{
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
},
contentContainer:{
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    height: 1000,
    flexGrow: 1,
},
header:{
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 1,
    borderColor: '#B8B8B8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

},
headerBar:{
    width: 150,
    height: 5,
    backgroundColor: '#414141',
    borderRadius: 50,
    marginVertical: 20,
},
profilePic:{
    width: 180,
    height: 250,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,

},
row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    width: '95%',
    /*justifyContent: 'space-between',*/
    marginHorizontal: 10,
},
sheetButton:{
    width: 250,
    backgroundColor: '#F36300',
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 20,

},
})
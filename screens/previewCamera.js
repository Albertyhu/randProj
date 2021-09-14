import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {CameraContext} from '../component/CameraContext.js';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {setCameraImage, reset, fill } from '../reduxFolder/actions/index.js';
import {goBack} from '@react-navigation/native';

//purpose of this page: To display the image that is taken on  the add.js page
class PreviewCamera extends React.Component{
componentDidMount(){
    this.props.fill();
}
render(){
const {image} = this.props;
const {test} = this.props;
   if(test === null || image === null){
    return(
        <View></View>
    )
    }

const defaultImage = () =>{
this.props.reset();
}

return(
<View style = {styles.container}>
    <Image
        source = {{uri: image,}}
        style = {styles.image}
    />

    <Text>Message: {test}</Text>
    <View style = {styles.buttonContainer}>
                <TouchableOpacity onPress = {() => defaultImage}>
                    <View style = {styles.button}>
                    <Text style = {{
                        color: '#fff',
                        padding: 5,
                    }}>Reset back to default</Text>
                    </View>
                </TouchableOpacity>
            </View>
    <View style = {styles.buttonContainer}>
            <TouchableOpacity onPress = {() => {this.props.navigation.goBack()}}>
                <View style = {styles.button}>
                <Text style = {{
                    color: '#fff',
                    padding: 5,
                }}>Go Back</Text>
                </View>
            </TouchableOpacity>
        </View>
</View>
)
}
}

//how do i test to see if this works?
//store and retrieve something simpler like a text string
//use console.log
const mapStateToProps = (store) =>({
       image: store.cameraR.image,
       test: store.cameraR.testString,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({setCameraImage, reset, fill}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PreviewCamera);

const WinWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
image:{
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
},
})
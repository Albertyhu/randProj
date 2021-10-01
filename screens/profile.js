import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Button, FlatList, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const renderItem = ({item}) => (
<View style = {styles.containerImage}>
    {item.downloadURL ? <Image
        source = {{uri: item.downloadURL}}
        style = {styles.image}
    /> :
        <Text>Image doesn't exist</Text>
    }
 </View>
)

const Row = item =>{
    return(
        <View>
            <Image
                source = {{uri: item.downloadURL}}
                style = {styles.image}
            />
        </View>
    )
}

const Profile = (props) =>{
    const { profilePic, postArray } = props;

return(
<View style = {styles.container}>
    <Text>Profile</Text>
    <View style = {{flex: 1/2, marginBottom: 10,}}>
    <Image
        style = {styles.profileFilePic}
        source = {profilePic ? {uri: profilePic} : null}
    />
    </View>
    <SafeAreaView style = {styles.containerGallery}>
      <FlatList
          numColumns = {3}
          data = {postArray}
          horizontal = {false}
          renderItem = {renderItem}
       />
     </SafeAreaView>
</View>
)
}

const mapStatetoProps = store =>({
    profilePic: store.userState.profilePicURL,
    postArray: store.userState.posts,
})

export default connect(mapStatetoProps, null)(Profile);

const WinWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
    },
   containerGallery: {
        flex: 1/2,
        width: WinWidth,
        alignItems: 'center',
    },
   containerImage:{

   },
    image:{
        aspectRatio: 1/1,
        flex: 1,
        width: 100,
        height: 100,
        margin: 5,

    },
    profileFilePic:{
        width: WinWidth * 0.9,
        height: '100%',
        flex: 1,
    },
})
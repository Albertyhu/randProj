import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, PermissionsAndroid, Button } from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps';

export default function Explore(){

const coordinate = ({
    latitude: 34.12094451061099,
    longitude: -118.06620690925487,
})


return(
<View style = {styles.container}>
  <MapView
   style={styles.map}
    initialRegion={{
      latitude: 34.120880,
      longitude: -118.066254,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <Marker
        coordinate = {coordinate}
        title = 'Home'
    >
        <Callout>
            <Text><Image source = {require('../assets/banner/food-banner1.jpg')} style = {styles.image}/></Text>
        </Callout>
    </Marker>
  </MapView>

</View>
)
}

const styles = StyleSheet.create({
container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
},
image: {
    width: 100,
    height: 100,
},
map: {
   ...StyleSheet.absoluteFillObject,
 },
})
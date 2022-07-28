import React from 'react'
import {View, Dimensions} from 'react-native'
import MapView from 'react-native-maps'
const MapPage = () => {
  const {width, height} = Dimensions.get('window')
  return (
    <View>
      <MapView
        style={{width, height}}
        initialRegion={{
          latitude: -1.558154,
          longitude: -78.409228,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      />
    </View>
  )
}

export default MapPage

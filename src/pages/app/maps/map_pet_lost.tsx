import React from 'react'
import {View, Dimensions} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
const MapPage = ({route}: {route?: any}) => {
  const {report, pet} = route.params
  const {width, height} = Dimensions.get('window')
  return (
    <View>
      <MapView
        style={{width, height}}
        initialRegion={{
          latitude: report ? parseFloat(report.latitude) : -1.558154,
          longitude: report ? parseFloat(report.longitude) : -78.409228,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {report && (
          <Marker
            title={pet.name}
            description={pet.pet_id}
            coordinate={{
              latitude: parseFloat(report.latitude),
              longitude: parseFloat(report.longitude),
            }}
          />
        )}
      </MapView>
    </View>
  )
}

export default MapPage

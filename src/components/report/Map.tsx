import React, {useContext} from 'react'
import MapView, {Marker} from 'react-native-maps'
import {TouchableOpacity} from 'react-native'
import LocationIcon from '@src/assets/icon/bx_current-location.svg'
import ConfigContext from '@src/contexts/config/ConfigContext'

interface IProps {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
  requestLocationPermission: () => void
  setLocation: (location: any) => void
}

const MapReport = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  requestLocationPermission,
  setLocation,
}: IProps) => {
  const {ConfigState} = useContext(ConfigContext)
  return (
    <>
      <TouchableOpacity
        onPress={requestLocationPermission}
        disabled={ConfigState.loading}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 15,
          right: 15,
          opacity: ConfigState.loading ? 0.5 : 1,
        }}>
        <LocationIcon width={30} height={30} fill={'black'} />
      </TouchableOpacity>
      <MapView
        moveOnMarkerPress={true}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        style={{width: '100%', height: '100%'}}>
        <Marker
          draggable={!ConfigState.loading}
          title="Ubicación del reporte"
          description="Mantén presionado y arrastra para mover la ubicación"
          onDragEnd={e => {
            setLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta,
              longitudeDelta,
            })
          }}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </>
  )
}

export default MapReport

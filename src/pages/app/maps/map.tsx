import React, {useEffect, useState} from 'react'
import {View, Dimensions, Image, Text} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import {GET_ALL_REPORTS} from '@src/services/lostPet'
import {reportAll} from '@src/types/declare'
const MapPage = () => {
  const {width, height} = Dimensions.get('window')
  const [reports, setReports] = useState<reportAll[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    GET_ALL_REPORTS().then(response => {
      const res = response.json()
      res.then(data => {
        const {reports} = data as {reports: reportAll[]}
        setReports(reports)
        setLoading(false)
      })
    })
  }, [])

  return (
    <View style={{position: 'relative'}}>
      <View style={{position: 'absolute', top: 20, right: 20, zIndex: 2}}>
        <Text style={{color: 'black'}}>
          Solo se muestran los últimos 100 reportes
        </Text>
        {loading ? (
          <Text style={{color: 'black', textAlign: 'right'}}>
            Los datos están cargando...
          </Text>
        ) : null}
      </View>
      <MapView
        style={{width, height}}
        initialRegion={{
          latitude: -1.558154,
          longitude: -78.409228,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}>
        {reports.map(report => {
          return (
            <Marker
              key={report.id}
              title={report.pet.name}
              coordinate={{
                latitude: parseFloat(report.latitude),
                longitude: parseFloat(report.longitude),
              }}>
              {report.pet.specie?.image ? (
                <Image
                  style={{width: 25, height: 25}}
                  source={{uri: report.pet.specie?.image?.url}}
                />
              ) : null}
            </Marker>
          )
        })}
      </MapView>
    </View>
  )
}

export default MapPage

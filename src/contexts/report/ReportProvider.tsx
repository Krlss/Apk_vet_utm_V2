import React, {useReducer, useEffect} from 'react'
import {user, pet, location, images, props} from '@src/types/declare'
import INITIAL_STATE from './InitialState'
import ReportContext from './ReportContext'
import ReportReducer from './ReportReducer'

import {PermissionsAndroid, Alert} from 'react-native'
import Geolocation from 'react-native-geolocation-service'

const ReportProvider = (props: props) => {
  const [ReportState, dispatch] = useReducer(ReportReducer, INITIAL_STATE)

  const setUser = (user: user | undefined) => {
    dispatch({
      type: 'SET_USER',
      payload: user,
    })
  }

  const setPet = (pet: pet | undefined) => {
    dispatch({
      type: 'SET_PET',
      payload: pet,
    })
  }

  const setLocation = (location: location) => {
    dispatch({
      type: 'SET_LOCATION',
      payload: location,
    })
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message: 'Necesitamos tu ubicación para poder localizarte',
          buttonPositive: 'OK',
          buttonNegative: 'Cancelar',
          buttonNeutral: 'Preguntarme luego',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location')
        Geolocation.getCurrentPosition(
          position => {
            dispatch({
              type: 'SET_LOCATION',
              payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
              },
            })
          },
          error => {
            Alert.alert(
              'Ubicación',
              'No permitiste acceder a tu ubicación, por defecto la ubicación es el cantón Portoviejo. Si no deseas usarla, puedes cambiarla manteniendo presionado el icono de ubicación y arrastrandolo a la ubicación que desees',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            )
            dispatch({
              type: 'SET_LOCATION',
              payload: {
                latitude: -1.0523174,
                longitude: -80.4588391,
                latitudeDelta: 1,
                longitudeDelta: 1,
              },
            })
            console.log(error.code, error.message)
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        )
      } else {
        console.log('Location permission denied')
        Alert.alert(
          'Ubicación',
          'No permitiste acceder a tu ubicación, por defecto la ubicación es el cantón Portoviejo',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        )
        dispatch({
          type: 'SET_LOCATION',
          payload: {
            latitude: -1.0523174,
            longitude: -80.4588391,
            latitudeDelta: 1,
            longitudeDelta: 1,
          },
        })
      }
    } catch (err) {
      dispatch({
        type: 'SET_LOCATION',
        payload: {
          latitude: -1.0523174,
          longitude: -80.4588391,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
      })
      console.warn({err})
    }
  }

  useEffect(() => {
    requestLocationPermission()
  }, [])

  return (
    <ReportContext.Provider
      value={{
        ReportState,
        setUser,
        setPet,
        setLocation,
        requestLocationPermission,
      }}>
      {props.children}
    </ReportContext.Provider>
  )
}

export default ReportProvider

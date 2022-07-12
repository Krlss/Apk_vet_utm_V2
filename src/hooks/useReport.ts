import { useState, useEffect } from 'react';
import MultipleImagePicker, {
    Results,
} from '@baronha/react-native-multiple-image-picker'
import { options } from '@src/constants/multiple-image-picker'
import { PermissionsAndroid, Alert } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

const useReport = () => {
    const [currentPosition, setCurrentPosition] = useState(0)
    const [filePath, setFilePath] = useState<Results[]>()
    const [location, setLocation] = useState({
        latitude: -1.0523174,
        longitude: -80.4588391,
        latitudeDelta: 1,
        longitudeDelta: 1,
    })

    const chooseFile = async () => {
        const response = await MultipleImagePicker.openPicker({ ...options, selectedAssets: filePath })
        if (response) {
            setFilePath(response)
        } else {
            setFilePath([])
        }
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
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 1,
                            longitudeDelta: 1,
                        })
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                )
            } else {
                Alert.alert('Permiso de ubicación', 'No se puede obtener tu ubicación')
            }
        } catch (err) {
            console.warn(err)
        }
    }


    const nextPosition = () => {
        setCurrentPosition(currentPosition + 1)
    }

    const prevPosition = () => {
        setCurrentPosition(currentPosition - 1)
    }

    useEffect(() => {
        requestLocationPermission()
    }, [])

    return {
        currentPosition, filePath,
        nextPosition,
        prevPosition,
        chooseFile,
        setFilePath,
        location,
        setLocation,
        requestLocationPermission
    }
}

export default useReport;

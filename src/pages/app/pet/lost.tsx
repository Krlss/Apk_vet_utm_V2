import React, {useContext, useState} from 'react'
import {
  View,
  ScrollView,
  TextStyle,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native'
import {useFormik} from 'formik'
import LongButton from '@src/components/buttons/LongButton'
import {LostPetProfile} from '@src/schemas/schemas'
import {petLost} from '@src/types/declare'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'
import AppStyles from '@src/themes/AppStyles'
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group'
import Photos from '@src/components/report/Photos'
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
import {options} from '@src/constants/multiple-image-picker'
import ConfigContext from '@src/contexts/config/ConfigContext'
import ReportContext from '@src/contexts/report/ReportContext'
import MapView, {Marker} from 'react-native-maps'

const dataCheck: {
  id: number
  text: string
  value: boolean
  fillColor: string
  unfillColor: string
  textStyle: TextStyle
}[] = [
  {
    id: 0,
    text: 'Si',
    value: true,
    fillColor: '#FF3838',
    unfillColor: '#FF8282',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
  {
    id: 1,
    text: 'No',
    value: false,
    fillColor: '#5BD321',
    unfillColor: '#8BE65F',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
]

const LostPage = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: any}
  const {AuthState} = useContext(AuthContext)
  const {ConfigState} = useContext(ConfigContext)
  const {setLocation, ReportState, requestLocationPermission} =
    useContext(ReportContext)
  const [modalVisible, setModalVisible] = useState(false)

  const {UPDATED_PET} = useAuth()
  const [filePath, setFilePath] = useState<any>(pet.images)
  const [maxFiles, setMaxFiles] = useState(6 - pet?.images.length)
  const [isChanged, setIsChanged] = useState(false)
  const selected =
    pet.lost === undefined
      ? undefined
      : dataCheck.findIndex(item => item.value === pet.lost)

  const formik = useFormik({
    initialValues: {
      lost: pet.lost,
    },
    validationSchema: LostPetProfile,
    onSubmit: async values => {
      if (pet.lost != values.lost || isChanged) {
        const formData = new FormData()
        filePath.forEach((item: any) => {
          formData.append('images[]', {
            uri: item.path ? item.path : item.url,
            name: item.fileName ? item.fileName : item.id_image,
            type: item.path ? 'image/jpeg' : 'unknown/unknown',
          })
        })

        formData.append('location', JSON.stringify(ReportState.location))
        formData.append('lost', values.lost)
        formData.append('pet_id', pet.pet_id)
        formData.append('user_id', AuthState.user.user_id)

        UPDATED_PET(formData, AuthState.user.api_token)
          .then((res: any) => {
            if (res?.type === 'success') {
              navigation.navigate('USER_PROFILE')
              requestLocationPermission()
            }
          })
          .catch((err: any) => {
            console.log(err)
          })
      }
    },
  })

  const chooseFile = async () => {
    const {maxSelectedAssets, ...otherOptions} = options
    const response = await MultipleImagePicker.openPicker({
      ...otherOptions,
      maxSelectedAssets: maxFiles,
    })
    if (response) {
      setFilePath([...filePath, ...response])
      setMaxFiles(maxFiles - response.length)
      setIsChanged(true)
    } else {
      setFilePath([])
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <BouncyCheckboxGroup
          data={dataCheck}
          initial={selected}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 10,
          }}
          onChange={(selectedItem: any) => {
            {
              formik.setFieldValue('lost', selectedItem.value)
              if (!selectedItem.value) {
                setFilePath(pet.images)
              } else {
                requestLocationPermission()
              }
              if (selectedItem.value != pet.lost) {
                setIsChanged(true)
              } else {
                setIsChanged(false)
              }
            }
          }}
        />
        {formik.errors.lost && (
          <Text
            style={{
              color: AppStyles.color.error,
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 10,
            }}>
            {formik.errors.lost}
          </Text>
        )}

        {formik.values.lost ? (
          <>
            <Photos
              filePath={filePath}
              navigation={navigation}
              route={route}
              routeTo="PHOTOS_PET"
              deleteFile={index => {
                setFilePath(
                  filePath.filter((item: any, i: number) => i !== index),
                )
                setMaxFiles(maxFiles + 1)
                setIsChanged(true)
              }}
            />
            <TouchableOpacity
              onPress={chooseFile}
              disabled={ConfigState.loading || filePath.length === 6}
              style={{
                backgroundColor: AppStyles.color.yellow,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: ConfigState.loading || filePath.length === 6 ? 0.5 : 1,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {!ConfigState.loading && filePath.length === 6
                  ? 'Solo se pueden 6 fotos'
                  : 'Seleccionar fotos'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              disabled={ConfigState.loading}
              style={{
                backgroundColor: AppStyles.color.yellow,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: ConfigState.loading ? 0.5 : 1,
                marginTop: 10,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Abrir el mapa
              </Text>
            </TouchableOpacity>
          </>
        ) : null}

        <Modal visible={modalVisible}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              position: 'absolute',
              top: 20,
              left: 25,
              zIndex: 1,
              backgroundColor: AppStyles.color.yellow,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Listo</Text>
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <MapView
              moveOnMarkerPress={true}
              style={{
                width: '100%',
                height: '100%',
              }}
              initialRegion={{
                latitude: ReportState.location.latitude,
                longitude: ReportState.location.longitude,
                latitudeDelta: ReportState.location.latitudeDelta,
                longitudeDelta: ReportState.location.longitudeDelta,
              }}>
              <Marker
                draggable={!ConfigState.loading}
                coordinate={{
                  latitude: ReportState.location.latitude,
                  longitude: ReportState.location.longitude,
                }}
                title="Ubicación"
                description="Ubicación actual"
                onDragEnd={e => {
                  setLocation({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitudeDelta: ReportState.location.latitudeDelta,
                    longitudeDelta: ReportState.location.longitudeDelta,
                  })
                  setIsChanged(true)
                }}
              />
            </MapView>
          </View>
        </Modal>
      </View>

      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={
          formik.isValid &&
          (pet.lost != formik.values.lost || isChanged) &&
          (formik.values.lost ? filePath.length > 0 : false)
        }
      />
    </ScrollView>
  )
}

export default LostPage

import React, {useContext, useState} from 'react'
import {View, ScrollView, TextStyle, Text, TouchableOpacity} from 'react-native'
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
  const {setLocation, ReportState} = useContext(ReportContext)
  console.log(ReportState)

  const {UPDATED_PET} = useAuth()
  const [filePath, setFilePath] = useState<any>(pet.images)
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
      if (pet.lost != values.lost) {
        const {name, ...otherValues} = pet
        const data = {
          ...otherValues,
          lost: values.lost,
        }
        UPDATED_PET(data, AuthState.user.api_token)
          .then((res: any) => {
            if (res.type === 'success') {
              navigation.navigate('USER_PROFILE')
            }
          })
          .catch((err: any) => {
            console.log(err)
          })
      }
    },
  })

  const chooseFile = async () => {
    const response = await MultipleImagePicker.openPicker({
      ...options,
      selectedAssets: filePath,
    })
    if (response) {
      setFilePath(response)
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
            flex: 1,
            justifyContent: 'space-evenly',
          }}
          onChange={(selectedItem: any) => {
            {
              formik.setFieldValue('lost', selectedItem.value)
              if (!selectedItem.value) {
                setFilePath([])
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
            />
            <TouchableOpacity
              onPress={chooseFile}
              disabled={ConfigState.loading}
              style={{
                backgroundColor: AppStyles.color.yellow,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: ConfigState.loading ? 0.5 : 1,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Seleccionar fotos
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>

      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={
          formik.isValid &&
          pet.lost != formik.values.lost &&
          (formik.values.lost ? filePath.length > 0 : true)
        }
      />
    </ScrollView>
  )
}

export default LostPage

import React, {useContext} from 'react'
import {View, ScrollView, TextStyle, Text} from 'react-native'
import {useFormik} from 'formik'
import LongButton from '@src/components/buttons/LongButton'
import {CastratedPetProfile} from '@src/schemas/schemas'
import {pet} from '@src/types/declare'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'
import AppStyles from '@src/themes/AppStyles'
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group'

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
    fillColor: '#5BD321',
    unfillColor: '#8BE65F',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
  {
    id: 1,
    text: 'No',
    value: false,
    fillColor: '#FF3838',
    unfillColor: '#FF8282',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
]

const CastratedPage = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_PET} = useAuth()
  const selected =
    pet.castrated === undefined
      ? undefined
      : dataCheck.findIndex(item => item.value === pet.castrated)

  const formik = useFormik({
    initialValues: {
      castrated: pet.castrated,
    },
    validationSchema: CastratedPetProfile,
    onSubmit: async values => {
      if (pet.name != values.castrated) {
        const {name, ...otherValues} = pet
        const data = {
          ...otherValues,
          castrated: values.castrated,
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
          onChange={(selectedItem: any) =>
            formik.setFieldValue('castrated', selectedItem.value)
          }
        />
        {formik.errors.castrated && (
          <Text
            style={{
              color: AppStyles.color.error,
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 10,
            }}>
            {formik.errors.castrated}
          </Text>
        )}
      </View>

      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid && pet.castrated != formik.values.castrated}
      />
    </ScrollView>
  )
}

export default CastratedPage

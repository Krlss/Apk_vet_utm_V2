import React, {useContext} from 'react'
import {View, ScrollView, TextStyle, Text} from 'react-native'
import {useFormik} from 'formik'
import LongButton from '@src/components/buttons/LongButton'
import {SexPetProfile} from '@src/schemas/schemas'
import {pet} from '@src/types/declare'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'
import AppStyles from '@src/themes/AppStyles'
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group'

const dataCheck: {
  id: number
  text: string
  value: string
  fillColor: string
  unfillColor: string
  textStyle: TextStyle
}[] = [
  {
    id: 0,
    text: 'Masculino',
    value: 'M',
    fillColor: '#00A0FF',
    unfillColor: '#77CDFF',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
  {
    id: 1,
    text: 'Feminino',
    value: 'F',
    fillColor: '#FF00FF',
    unfillColor: '#FF77FF',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
]

const SexPage = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_PET} = useAuth()
  const selected = !pet.sex
    ? undefined
    : dataCheck.findIndex(item => item.value === pet.sex)

  const formik = useFormik({
    initialValues: {
      sex: pet.sex,
    },
    validationSchema: SexPetProfile,
    onSubmit: async values => {
      if (pet.name != values.sex) {
        const {name, ...otherValues} = pet
        const data = {
          ...otherValues,
          sex: values.sex,
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
            formik.setFieldValue('sex', selectedItem.value)
          }
        />
        {formik.errors.sex && (
          <Text
            style={{
              color: AppStyles.color.error,
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 10,
            }}>
            {formik.errors.sex}
          </Text>
        )}
      </View>

      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid && pet.sex != formik.values.sex}
      />
    </ScrollView>
  )
}

export default SexPage

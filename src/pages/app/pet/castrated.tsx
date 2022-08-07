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
import {CASTRATED_CHECK} from '@src/constants/globals'

const CastratedPage = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_PET} = useAuth()
  const selected =
    pet.castrated === undefined
      ? undefined
      : CASTRATED_CHECK.findIndex(item => item.value === pet.castrated)

  const formik = useFormik({
    initialValues: {
      castrated: pet.castrated,
    },
    validationSchema: CastratedPetProfile,
    onSubmit: async values => {
      if (pet.name != values.castrated) {
        const data = new FormData()
        data.append('castrated', values.castrated)
        data.append('pet_id', pet.pet_id)
        data.append('user_id', AuthState.user.user_id)

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
          data={CASTRATED_CHECK}
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

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
import {SEX_CHECK} from '@src/constants/globals'
import ConfigContext from '@src/contexts/config/ConfigContext'

const SexPage = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {ConfigState} = useContext(ConfigContext)
  const {UPDATED_PET} = useAuth()
  const selected = !pet.sex
    ? undefined
    : SEX_CHECK.findIndex(item => item.value === pet.sex)

  const formik = useFormik({
    initialValues: {
      sex: pet.sex,
    },
    validationSchema: SexPetProfile,
    onSubmit: async values => {
      if (pet.name != values.sex) {
        const data = new FormData()
        data.append('sex', values.sex)
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
      <View style={{flex: 1, position: 'relative'}}>
        <BouncyCheckboxGroup
          data={SEX_CHECK}
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
        {ConfigState.loading ? (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%',
            }}
          />
        ) : null}
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

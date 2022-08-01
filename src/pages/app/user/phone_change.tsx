import React, {useContext} from 'react'
import {View, ScrollView} from 'react-native'
import {useFormik} from 'formik'
import InputNormal from '@src/components/inputs/InputNormal'
import LongButton from '@src/components/buttons/LongButton'
import {PhoneUserProfile} from '@src/schemas/schemas'
import AuthContext from '@src/contexts/auth/AuthContext'
import useAuth from '@src/hooks/useAuth'

const PhoneChange = ({navigation, route}: any) => {
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_USER} = useAuth()
  const formik = useFormik({
    initialValues: {phone: AuthState.user.phone},
    validationSchema: PhoneUserProfile,
    onSubmit: async values => {
      if (AuthState.user.phone != values.phone) {
        const data = {
          ...AuthState.user,
          phone: values.phone,
        }
        UPDATED_USER(data, AuthState.user.api_token).then((res: any) => {
          if (res.type === 'success') {
            navigation.goBack()
          }
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
        <InputNormal
          value={formik.values.phone}
          placeholder="Teléfono"
          onChangeText={formik.handleChange('phone')}
          error={formik.errors.phone}
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid && AuthState.user.phone != formik.values.phone}
      />
    </ScrollView>
  )
}

export default PhoneChange

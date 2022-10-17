import React, {useContext} from 'react'
import {View, ScrollView} from 'react-native'
import {useFormik} from 'formik'
import InputNormal from '@src/components/inputs/InputNormal'
import LongButton from '@src/components/buttons/LongButton'
import {EmailUserProfile} from '@src/schemas/schemas'
import AuthContext from '@src/contexts/auth/AuthContext'
import useAuth from '@src/hooks/useAuth'

const EmailChange = ({navigation, route}: any) => {
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_USER} = useAuth()
  const formik = useFormik({
    initialValues: {email: AuthState.user.email},
    validationSchema: EmailUserProfile,
    onSubmit: async values => {
      if (AuthState.user.email != values.email) {
        const data = {
          email: values.email,
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
          value={formik.values.email}
          placeholder="Correo electrónico"
          onChangeText={formik.handleChange('email')}
          error={formik.errors.email}
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid && AuthState.user.email != formik.values.email}
      />
    </ScrollView>
  )
}

export default EmailChange

import React, {useContext} from 'react'
import {View, ScrollView} from 'react-native'
import InputNormal from '@src/components/inputs/InputNormal'
import {useFormik} from 'formik'
import LongButton from '@src/components/buttons/LongButton'
import {PasswordUserProfile} from '@src/schemas/schemas'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'
const PasswordChange = ({navigation, route}: any) => {
  const {CHANGE_PASSWORD} = useAuth()
  const {AuthState} = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      currentPassword: '',
    },
    validationSchema: PasswordUserProfile,
    onSubmit: async values => {
      const data = {
        ...AuthState.user,
        password: values.password,
        currentPassword: values.currentPassword,
      }
      CHANGE_PASSWORD(data, AuthState.user.api_token).then((res: any) => {
        if (res.type === 'success') {
          navigation.goBack()
        }
      })
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
          value={formik.values.currentPassword}
          placeholder="Contraseña actual"
          onChangeText={formik.handleChange('currentPassword')}
          error={formik.errors.currentPassword}
        />
        <InputNormal
          value={formik.values.password}
          placeholder="Nueva contraseña"
          onChangeText={formik.handleChange('password')}
          error={formik.errors.password}
        />
        <InputNormal
          value={formik.values.confirmPassword}
          placeholder="Confirmar contraseña"
          onChangeText={formik.handleChange('confirmPassword')}
          error={formik.errors.confirmPassword}
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid}
      />
    </ScrollView>
  )
}

export default PasswordChange

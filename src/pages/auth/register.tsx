import React from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'
import Animated from 'react-native-reanimated'
import AppStyles from '@src/themes/AppStyles'
import {registerSchema} from '@src/schemas/schemas'
import {initialValuesRegister} from '@src/constants/formik'
import {useFormik} from 'formik'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AuthStackProps} from '@src/types/declare'

import {
  LogoAndNameApp,
  InputFloatingLabel,
  FooterUTM,
  ButtonLongButton,
  ButtonChangeScreenAuth,
} from '@src/components'
import {animationPaddingTop} from '@src/animations'
import useAuth from '@src/hooks/useAuth'
/**
 * Screen for Register
 * @returns JSX.Element Screen Register
 */

const Register = ({navigation}: NativeStackScreenProps<AuthStackProps>) => {
  const {animatedPaddingTop} = animationPaddingTop(20)
  const {register} = useAuth()

  const formik = useFormik({
    initialValues: initialValuesRegister,
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      const res = await register(values)
      if (res?.errors) {
        actions.setFieldError('user_id', res?.errors.user_id)
        actions.setFieldError('email', res?.errors.email)
        actions.setFieldError('phone', res?.errors.phone)
      } else if (res?.type === 'success') {
        navigation.navigate('LOGIN')
      }
    },
  })

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Animated.View style={[styles.container, animatedPaddingTop]}>
        <LogoAndNameApp />

        <InputFloatingLabel
          label="Cédula o RUC"
          keyboardType="numeric"
          onChange={formik.handleChange('user_id')}
          error={formik.errors.user_id}
          value={formik.values.user_id}
        />

        <InputFloatingLabel
          label="Nombre completo"
          autoCapitalize="words"
          autoComplete="name"
          onChange={formik.handleChange('fullname')}
          error={formik.errors.fullname}
          value={formik.values.fullname}
        />

        <InputFloatingLabel
          label="Teléfono"
          keyboardType="numeric"
          autoComplete="tel"
          onChange={formik.handleChange('phone')}
          error={formik.errors.phone}
          value={formik.values.phone}
        />

        <InputFloatingLabel
          label="Correo electrónico"
          autoComplete="email"
          onChange={formik.handleChange('email')}
          error={formik.errors.email}
          value={formik.values.email}
        />

        <InputFloatingLabel
          label="Contraseña"
          secureTextEntry
          onChange={formik.handleChange('password')}
          error={formik.errors.password}
          value={formik.values.password}
          onSubmitEditing={formik.handleSubmit}
        />

        <View style={{marginTop: 20}}>
          <ButtonLongButton
            isValid={formik.isValid}
            onPress={formik.handleSubmit}
            text="REGISTRAR"
          />
        </View>

        <ButtonChangeScreenAuth
          onPress={() => {
            navigation.navigate('LOGIN')
          }}
          text="Iniciar sesión"
          label="¿Ya tienes una cuenta?"
        />

        <FooterUTM />
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: AppStyles.padding.xlarge,
    paddingBottom: AppStyles.padding.large,
  },
})

export default Register

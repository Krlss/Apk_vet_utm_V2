import React from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import AppStyles from '@src/themes/AppStyles'
import {registerSchema} from '@src/schemas/schemas'
import {initialValuesRegister} from '@src/constants/formik'
import {Formik} from 'formik'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AuthStackProps} from '@src/types/declare'

import {
  LogoAndNameApp,
  FormikFloatingLabelInput,
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
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Animated.View style={[styles.container, animatedPaddingTop]}>
        <LogoAndNameApp />

        <Formik
          validationSchema={registerSchema}
          initialValues={initialValuesRegister}
          onSubmit={(values, actions) => {
            register(values).then(res => {
              if (res?.errors) {
                actions.setFieldError('user_id', res?.errors.user_id)
                actions.setFieldError('email', res?.errors.email)
                actions.setFieldError('phone', res?.errors.phone)
              } else if (res?.type === 'success') {
                navigation.navigate('LOGIN')
              }
            })
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <FormikFloatingLabelInput
                name="user_id"
                label="Cédula o RUC"
                keyboardType="numeric"
              />

              <FormikFloatingLabelInput
                name="fullname"
                label="Nombre completo"
                autoCapitalize="words"
                autoComplete="name"
              />

              <FormikFloatingLabelInput
                name="phone"
                label="Teléfono"
                keyboardType="phone-pad"
                autoComplete="tel"
              />

              <FormikFloatingLabelInput
                name="email"
                label="Correo electrónico"
                autoComplete="email"
              />

              <FormikFloatingLabelInput
                name="password"
                label="Contraseña"
                secureTextEntry
                onSubmitEditing={handleSubmit}
              />

              <ButtonLongButton
                isValid={isValid}
                onPress={handleSubmit}
                text="REGISTRAR"
              />

              <ButtonChangeScreenAuth
                onPress={() => {
                  navigation.navigate('LOGIN')
                }}
                text="Iniciar sesión"
                label="¿Ya tienes una cuenta?"
              />
            </>
          )}
        </Formik>

        <FooterUTM />
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: AppStyles.padding.xlarge,
    alignItems: 'center',
    paddingBottom: AppStyles.padding.large,
  },
})

export default Register

import React from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import {useFormik} from 'formik'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import AppStyles from '@src/themes/AppStyles'
import {animationPaddingTop} from '@src/animations'
import {loginSchema} from '@src/schemas/schemas'
import {AuthStackProps} from '@src/types/declare'
import {halfThird} from '@src/constants/animations'
import {initialValuesLogin} from '@src/constants/formik'
import {
  ButtonChangeScreenAuth,
  ButtonLinkFash,
  ButtonLongButton,
  FooterUTM,
  LogoAndNameApp,
  LabelTextLink,
} from '@src/components'
import useAuth from '@src/hooks/useAuth'
import FloatingLabelInput from '@src/components/inputs/FloatingLabelInput'

/**
 * Screen for login
 * @returns JSX.Element Screen Login
 */

const Login = ({navigation, route}: NativeStackScreenProps<AuthStackProps>) => {
  const {animatedPaddingTop} = animationPaddingTop(halfThird)
  const {login} = useAuth()

  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: loginSchema,
    onSubmit: async values => {
      await login(values)
    },
  })

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Animated.View style={[styles.container, animatedPaddingTop]}>
        <LogoAndNameApp />

        <FloatingLabelInput
          label="Correo electrónico"
          onChange={formik.handleChange('email')}
          error={formik.errors.email}
          value={formik.values.email}
          autoComplete="email"
        />

        <FloatingLabelInput
          label="Contraseña"
          secureTextEntry
          onChange={formik.handleChange('password')}
          error={formik.errors.password}
          value={formik.values.password}
          onSubmitEditing={formik.handleSubmit}
        />

        <ButtonLinkFash
          onPress={() => console.log('Show lost password interface')}>
          <LabelTextLink TEXT="¿Olvidaste tu contraseña?" />
        </ButtonLinkFash>

        <ButtonLongButton
          isValid={formik.isValid}
          onPress={formik.handleSubmit}
          text="ACCEDER"
        />

        <ButtonChangeScreenAuth
          onPress={() => {
            navigation.navigate('REGISTER')
          }}
          text="Registrarse"
          label="¿No tienes una cuenta?"
        />

        <ButtonChangeScreenAuth
          onPress={() => {
            navigation.navigate('HOME_DRAWER')
          }}
          text="continuar sin iniciar sesión"
          stylesLink={{color: AppStyles.color.cyan}}
        />

        <FooterUTM />
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: AppStyles.padding.xlarge,
  },
})

export default Login

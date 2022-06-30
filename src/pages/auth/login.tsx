import React, {useContext} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import {Formik} from 'formik'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import AppStyles from '@src/themes/AppStyles'
import {animationPaddingTop} from '@src/animations'
import {loginSchema} from '@src/schemas/schemas'
import ConfigContext from '@src/contexts/config/ConfigContext'
import {AuthStackProps} from '@src/types/declare'
import {halfThird} from '@src/constants/animations'
import {initialValuesLogin} from '@src/constants/formik'
import {
  ButtonChangeScreenAuth,
  ButtonLinkFash,
  ButtonLongButton,
  FooterUTM,
  FormikFloatingLabelInput,
  LogoAndNameApp,
  LabelTextLink,
} from '@src/components'
import useAuth from '@src/hooks/useAuth'

/**
 * Screen for login
 * @returns JSX.Element Screen Login
 */

const Login = ({navigation}: NativeStackScreenProps<AuthStackProps>) => {
  const {KeyboardDismiss} = useContext(ConfigContext)
  const {animatedPaddingTop} = animationPaddingTop(halfThird)
  const {login, fetchState} = useAuth()
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Animated.View style={[styles.container, animatedPaddingTop]}>
        <LogoAndNameApp />

        <Formik
          validationSchema={loginSchema}
          initialValues={initialValuesLogin}
          onSubmit={values => login(values)}>
          {({handleSubmit, isValid}) => (
            <>
              <FormikFloatingLabelInput
                name="email"
                label="Correo electrónico"
                autoComplete="email"
              />
              <FormikFloatingLabelInput
                name="password"
                label="Contraseña"
                secureTextEntry
              />
              <ButtonLinkFash
                onPress={() => console.log('Show lost password interface')}>
                <LabelTextLink TEXT="¿Olvidaste tu contraseña?" />
              </ButtonLinkFash>

              <ButtonLongButton
                isValid={isValid}
                onPress={handleSubmit}
                text="ACCEDER"
                loading={fetchState}
              />

              <ButtonChangeScreenAuth
                onPress={() => {
                  navigation.navigate('REGISTER')
                }}
                text="Registrarse"
                label="¿No tienes una cuenta?"
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
  },
})

export default Login

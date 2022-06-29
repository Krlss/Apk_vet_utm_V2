import React, {useContext} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import LogoAndNameApp from '@src/components/headers/LogoAndNameApp'
import ConfigContext from '@src/contexts/config/ConfigContext'
import animationPaddingTop from '@src/animations/animationPaddingTop'
import AppStyles from '@src/themes/AppStyles'
import LinkFash from '@src/components/buttons/LinkFash'
import TextLink from '@src/components/labels/TextLink'
import ChangeScreenAuth from '@src/components/buttons/ChangeScreenAuth'
import LongButton from '@src/components/buttons/LongButton'
import FooterUTM from '@src/components/footer/UTM'
import FormikFloatingLabelInput from '@src/components/formik/formikFloatingLabelInput'
import {loginSchema} from '@src/schemas/schemas'
import {initialValuesLogin} from '@src/constants/formik'
import {Formik} from 'formik'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AuthStackProps} from '@src/types/declare'
import {halfThird} from '@src/constants/animations'
/**
 * Screen for login
 * @returns JSX.Element Screen Login
 */

const Login = ({navigation}: NativeStackScreenProps<AuthStackProps>) => {
  const {KeyboardDismiss} = useContext(ConfigContext)
  const {animatedPaddingTop} = animationPaddingTop(halfThird)

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Animated.View style={[styles.container, animatedPaddingTop]}>
        <LogoAndNameApp />

        <Formik
          validationSchema={loginSchema}
          initialValues={initialValuesLogin}
          onSubmit={values => console.log(values)}>
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
              <LinkFash
                onPress={() => console.log('Show lost password interface')}>
                <TextLink TEXT="¿Olvidaste tu contraseña?" />
              </LinkFash>

              <LongButton
                isValid={isValid}
                onPress={handleSubmit}
                text="ACCEDER"
              />

              <ChangeScreenAuth
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

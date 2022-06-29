import React, {useContext} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import ConfigContext from '@src/contexts/config/ConfigContext'
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

/**
 * Screen for Register
 * @returns JSX.Element Screen Register
 */

const Register = ({navigation}: NativeStackScreenProps<AuthStackProps>) => {
  const {KeyboardDismiss} = useContext(ConfigContext)
  const {animatedPaddingTop} = animationPaddingTop(10)

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Animated.View style={[styles.container, animatedPaddingTop]}>
        <LogoAndNameApp />

        <Formik
          validationSchema={registerSchema}
          initialValues={initialValuesRegister}
          onSubmit={values => console.log(values)}>
          {({handleSubmit, isValid}) => (
            <>
              <FormikFloatingLabelInput
                name="user_id"
                label="Cédula o RUC"
                keyboardType="numeric"
              />

              <FormikFloatingLabelInput
                name="full_name"
                label="Nombre completo"
                autoCapitalize="words"
              />

              <FormikFloatingLabelInput
                name="phone"
                label="Teléfono"
                keyboardType="phone-pad"
              />

              <FormikFloatingLabelInput
                name="email"
                label="Correo electrónico"
              />

              <FormikFloatingLabelInput
                name="password"
                label="Contraseña"
                secureTextEntry
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

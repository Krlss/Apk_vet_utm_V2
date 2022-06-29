import React, {useContext} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import Animated from 'react-native-reanimated'
import LogoAndNameApp from '@src/components/headers/LogoAndNameApp'
import ConfigContext from '@src/contexts/config/ConfigContext'
import animationPaddingTop from '@src/animations/animationPaddingTop'
import AppStyles from '@src/themes/AppStyles'
import ChangeScreenAuth from '@src/components/buttons/ChangeScreenAuth'
import LongButton from '@src/components/buttons/LongButton'
import FooterUTM from '@src/components/footer/UTM'
import FormikFloatingLabelInput from '@src/components/formik/formikFloatingLabelInput'
import {registerSchema} from '@src/schemas/schemas'
import {initialValuesRegister} from '@src/constants/formik'
import {Formik} from 'formik'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AuthStackProps} from '@src/types/declare'

/**
 * Screen for Register
 * @returns JSX.Element Screen Register
 */

const Register = ({navigation}: NativeStackScreenProps<AuthStackProps>) => {
  const {KeyboardDismiss} = useContext(ConfigContext)
  const {animatedPaddingTop} = animationPaddingTop(20)

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

              <LongButton
                isValid={isValid}
                onPress={handleSubmit}
                text="REGISTRAR"
              />

              <ChangeScreenAuth
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

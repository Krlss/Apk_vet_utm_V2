import useData from '@src/hooks/useData'
import React, {useContext} from 'react'
import {StyleSheet, ScrollView, View, Text} from 'react-native'
import Animated from 'react-native-reanimated'
import FloatingLabelInput from '@src/components/inputs/FloatingLabelInput'
import LogoAndNameApp from '@src/components/headers/LogoAndNameApp'
import ConfigContext from '@src/contexts/config/ConfigContext'
import animationPaddingTop from '@src/animations/animationPaddingTop'
import AppStyles from '@src/themes/AppStyles'
import LinkFash from '@src/components/buttons/LinkFash'
import TextLink from '@src/components/labels/TextLink'
import ChangeScreenAuth from '@src/components/buttons/ChangeScreenAuth'
import LongButton from '@src/components/buttons/LongButton'
import FooterUTM from '@src/components/footer/UTM'

const Login = () => {
  const {data, handleChange} = useData()
  const {KeyboardDismiss} = useContext(ConfigContext)
  const {animatedPaddingTop} = animationPaddingTop()

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.container_base}>
      <Animated.View style={[styles.container, animatedPaddingTop]}>
        <LogoAndNameApp />

        <FloatingLabelInput
          autoComplete="email"
          value={data?.email}
          onChange={value => handleChange('email', value)}
          label="Correo electrónico"
        />
        <FloatingLabelInput
          value={data?.password}
          secureTextEntry
          onChange={value => handleChange('password', value)}
          label="Contraseña"
        />

        <LinkFash onPress={() => console.log('Show lost password interface')}>
          <TextLink TEXT="¿Olvidaste tu contraseña?" />
        </LinkFash>

        <LongButton onPress={() => console.log('Login')} text="ACCEDER" />

        <ChangeScreenAuth
          onPress={() => console.log('Show register interface')}
          text="Registrarse"
          label="¿No tienes una cuenta?"
        />

        <FooterUTM />
      </Animated.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container_base: {
    backgroundColor: AppStyles.color.default_bg,
  },
  container: {
    backgroundColor: AppStyles.color.default_bg,
    paddingHorizontal: AppStyles.padding.xlarge,
    alignItems: 'center',
  },
})

export default Login

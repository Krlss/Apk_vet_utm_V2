import React from 'react'
import Animated from 'react-native-reanimated'

import animationLogo from '@src/animations/animationLogo'

const Logo = () => {
  const {animatedScale} = animationLogo()

  return (
    <Animated.Image
      source={require('@src/assets/img/icon.png')}
      style={animatedScale}
    />
  )
}
export default Logo

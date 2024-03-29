import React from 'react'
import Lottie from 'lottie-react-native'
import LoadingLottie from '@src/assets/animations/loading-ec.json'
import AppStyles from '@src/themes/AppStyles'

const Loading = ({style = {}}) => {
  return (
    <Lottie
      source={LoadingLottie}
      autoPlay
      loop
      style={[
        {backgroundColor: AppStyles.color.bg_low_gray, zIndex: 10},
        style,
      ]}
    />
  )
}

export default Loading

import React from 'react'
import {TouchableHighlight, StyleSheet} from 'react-native'
import EyeShow from '@src/assets/icon/EyeShow.svg'
import EyeHidden from '@src/assets/icon/EyeHidden.svg'
import AppStyles from '@src/themes/AppStyles'

interface ShowOrHiddenPasswordProps {
  show: boolean
  onPress: () => void
}

const ShowOrHiddenPassword = ({show, onPress}: ShowOrHiddenPasswordProps) => {
  return (
    <TouchableHighlight
      underlayColor={AppStyles.color.transparent}
      style={styles.touchableOpacity}
      onPress={onPress}>
      {show ? (
        <EyeHidden width={25} height={25} fill={AppStyles.color.low_gray} />
      ) : (
        <EyeShow width={25} height={25} fill={AppStyles.color.low_gray} />
      )}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    position: 'absolute',
    right: AppStyles.padding.medium,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ShowOrHiddenPassword

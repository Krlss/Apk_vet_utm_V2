import React from 'react'
import {TouchableHighlight, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'

interface LinkFashProps {
  children: React.ReactNode
  onPress?: () => void
  [x: string]: any
}

const LinkFash = ({children, onPress, ...props}: LinkFashProps) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.container}
      underlayColor="none"
      {...props}>
      {children}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginTop: AppStyles.margin.medium,
  },
})

export default LinkFash

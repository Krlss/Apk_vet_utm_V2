import React, {useContext} from 'react'
import {TouchableHighlight, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import ConfigContext from '@src/contexts/config/ConfigContext'
interface LinkFashProps {
  children: React.ReactNode
  onPress?: () => void
  [x: string]: any
}

const LinkFash = ({children, onPress, ...props}: LinkFashProps) => {
  const {ConfigState} = useContext(ConfigContext)

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={ConfigState.loading}
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

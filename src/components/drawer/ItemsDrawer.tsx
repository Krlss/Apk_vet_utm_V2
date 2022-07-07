import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import IconSwitch from '../icons/IconSwitch'
import AppStyles from '@src/themes/AppStyles'

interface Props {
  label: string
  onPress: () => void
  active: boolean
  nameIcon: string
  [x: string]: any
}

const ItemsDrawer = ({label, nameIcon, onPress, active, ...props}: Props) => {
  const styles = ThisStyles(active)
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IconSwitch name={nameIcon} active={active} {...props} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const ThisStyles = (active: boolean) =>
  StyleSheet.create({
    text: {
      fontSize: AppStyles.font.size.medium,
      fontWeight: 'bold',
      color: active ? AppStyles.color.white : AppStyles.color.black,
      marginLeft: AppStyles.padding.medium,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: AppStyles.padding.medium,
      borderRadius: AppStyles.borderRadius.xxxxlarge,
      backgroundColor: active
        ? AppStyles.color.yellow
        : AppStyles.color.transparent,
    },
  })

export default ItemsDrawer

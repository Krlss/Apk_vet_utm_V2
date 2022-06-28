import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import AppStyles from '@src/themes/AppStyles'
import LinkFash from './LinkFash'
import TextLink from '../labels/TextLink'

interface Props {
  onPress: () => void
  text: string
  label?: string
}

const ChangeScreenAuth = ({onPress, text, label}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <LinkFash onPress={onPress} style={{marginTop: 0}}>
        <TextLink TEXT={text} style={styles.text} />
      </LinkFash>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppStyles.margin.medium,
  },
  text: {
    fontSize: AppStyles.font.size.medium,
    color: AppStyles.color.yellow,
    fontWeight: '700',
    fontFamily: AppStyles.fontFamily.default,
    marginLeft: AppStyles.margin.small,
  },
  label: {
    color: AppStyles.color.black,
  },
})

export default ChangeScreenAuth

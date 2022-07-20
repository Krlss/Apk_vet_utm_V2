import {View, Text, StyleSheet} from 'react-native'
import React, {useContext} from 'react'
import AppStyles from '@src/themes/AppStyles'
import LinkFash from './LinkFash'
import TextLink from '../labels/TextLink'
import ConfigContext from '@src/contexts/config/ConfigContext'
interface Props {
  onPress: () => void
  text: string
  label?: string
  stylesLink?: {}
  stylesContainer?: {}
}

const ChangeScreenAuth = ({
  onPress,
  text,
  label,
  stylesLink,
  stylesContainer,
}: Props) => {
  const {ConfigState} = useContext(ConfigContext)
  return (
    <View style={[styles.container, stylesContainer]}>
      <Text style={styles.label}>{label}</Text>

      <LinkFash onPress={onPress} style={{marginTop: 0}}>
        <TextLink
          TEXT={text}
          style={[
            styles.text,
            stylesLink,
            ConfigState.loading && {opacity: 0.5},
          ]}
        />
      </LinkFash>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

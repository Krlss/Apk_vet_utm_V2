import React, {useContext} from 'react'
import {Text, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import ConfigContext from '@src/contexts/config/ConfigContext'
interface TextLinkProps {
  TEXT: string
  style?: {}
}

/**
 *
 * @param TEXT text for TextLink
 * @param style if exist
 * @returns JSX.Element Text
 *  */
const TextLink = ({TEXT, style}: TextLinkProps) => {
  const {ConfigState} = useContext(ConfigContext)
  return (
    <Text style={[styles.link, style, ConfigState.loading && {opacity: 0.5}]}>
      {TEXT}
    </Text>
  )
}

const styles = StyleSheet.create({
  link: {
    fontWeight: '500',
    color: AppStyles.color.black,
    fontFamily: AppStyles.fontFamily.default,
  },
})

export default TextLink

import React from 'react'
import {Text, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'

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
  return <Text style={[styles.link, style]}>{TEXT}</Text>
}

const styles = StyleSheet.create({
  link: {
    fontSize: AppStyles.font.size.medium,
    fontWeight: '500',
    color: AppStyles.color.placeholder,
    fontFamily: AppStyles.fontFamily.default,
  },
})

export default TextLink

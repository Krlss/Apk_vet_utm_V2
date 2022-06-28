import React from 'react'
import {TextInput, StyleSheet} from 'react-native'

interface LabelProps {
  text: string
  [x: string]: any
}

const Label = ({text, ...props}: LabelProps) => {
  return (
    <TextInput style={styles.label} {...props}>
      {text}
    </TextInput>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
})

export default Label

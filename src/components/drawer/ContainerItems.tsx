import React from 'react'
import {View, StyleSheet} from 'react-native'

const ContainerItems = (props: any) => {
  return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    marginTop: 20,
  },
})

export default ContainerItems

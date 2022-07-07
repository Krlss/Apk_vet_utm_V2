import React from 'react'
import {View, Text} from 'react-native'
import useData from '@src/hooks/useData'
import HeaderSpecies from '@src/components/headers/Species'
const Home = () => {
  const {species, pressSpecie} = useData()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <HeaderSpecies data={species} onPress={pressSpecie} />
    </View>
  )
}

export default Home

import React from 'react'
import {View} from 'react-native'
import useData from '@src/hooks/useData'
const Home = () => {
  const {data} = useData()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}></View>
  )
}

export default Home

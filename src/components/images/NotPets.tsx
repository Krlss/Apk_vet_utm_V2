import React from 'react'
import {View, Text, Image} from 'react-native'

const NotPets = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={require('../../assets/img/abeja.png')}
      />
      <Text style={{color: 'black', fontWeight: 'bold', marginTop: 10}}>
        No hay mascotas perdidas
      </Text>
    </View>
  )
}

export default NotPets

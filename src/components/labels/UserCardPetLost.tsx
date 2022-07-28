import React from 'react'
import {View, Text} from 'react-native'
import AppStyles from '@src/themes/AppStyles'

const UserCardPetLost = ({
  user,
  bool,
}: {
  user: {email: string}
  bool: boolean
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 1,
        margin: 5,
        marginHorizontal: 20,
      }}>
      {bool ? (
        <Text
          style={{
            backgroundColor: AppStyles.color.yellow,
            paddingVertical: 10,
            paddingHorizontal: 17,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 20,
            borderRadius: 50,
            marginRight: 10,
            color: 'black',
          }}>
          {user?.email[0]}
        </Text>
      ) : null}

      <View>
        <Text numberOfLines={1} style={{color: 'black', fontWeight: 'bold'}}>
          {user?.email}
        </Text>
        <Text style={{color: 'gray'}}>Dueño</Text>
      </View>
    </View>
  )
}

export default UserCardPetLost

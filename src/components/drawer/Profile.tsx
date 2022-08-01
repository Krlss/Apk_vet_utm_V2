import React, {useContext} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {DrawerContentComponentProps} from '@react-navigation/drawer'
import AppStyles from '@src/themes/AppStyles'
import AuthContext from '@src/contexts/auth/AuthContext'

const ProfileDrawer = ({navigation}: DrawerContentComponentProps) => {
  const {AuthState} = useContext(AuthContext)
  return (
    <TouchableOpacity onPress={() => navigation.navigate('STACK_USER_PROFILE')}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            color: 'white',
          }}>
          {AuthState.user.name ? AuthState.user.name[0] : 'S'}
        </Text>
        <View style={{flex: 1}}>
          <Text style={styles.name} numberOfLines={1}>
            {AuthState?.user?.last_name1 +
              ' ' +
              AuthState?.user?.last_name2 +
              ' ' +
              AuthState?.user?.name}
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>Ver perfil</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    color: AppStyles.color.black,
    fontWeight: 'bold',
    maxWidth: '90%',
  },
})

export default ProfileDrawer

import React, {useContext} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {DrawerContentComponentProps} from '@react-navigation/drawer'
import AppStyles from '@src/themes/AppStyles'
import AuthContext from '@src/contexts/auth/AuthContext'

const ProfileDrawer = ({navigation}: DrawerContentComponentProps) => {
  const {AuthState} = useContext(AuthContext)
  return (
    <TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: AuthState?.user?.profile_photo_path,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={styles.name} numberOfLines={1}>
            {AuthState?.user?.name +
              ' ' +
              AuthState?.user?.last_name1 +
              ' ' +
              AuthState?.user?.last_name2}
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

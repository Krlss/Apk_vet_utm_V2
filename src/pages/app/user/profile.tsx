import React, {useContext, useEffect, useState} from 'react'
import {ScrollView, View, Text} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import {FooterUTM} from '@src/components'
import InfoTouchables from '@src/components/profiles/InfoTouchables'
import AuthContext from '@src/contexts/auth/AuthContext'
import ConfigContext from '@src/contexts/config/ConfigContext'
import {GET_USER_PROFILE} from '@src/services/user'
import {formatNumber} from '@src/utils/format'
import ProfileUserSkeleton from '@src/components/skeleton/ProfileUser'

const UserProfile = ({navigation, route}: any) => {
  const {AuthState, setDataUser} = useContext(AuthContext)
  const {ConfigState, toggleLoading} = useContext(ConfigContext)
  const [loading, setLoading] = useState(true)
  const getProfile = () => {
    toggleLoading(true)
    setLoading(true)
    GET_USER_PROFILE(AuthState.user.user_id, AuthState.user.api_token)
      .then(res => res.json())
      .then(res => {
        if (res?.user) {
          setDataUser(res.user)
        }
        toggleLoading(false)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        toggleLoading(false)
        setLoading(false)
      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppStyles.color.bg_low_gray}}>
      {ConfigState.loading || loading ? (
        <View style={{flex: 1}}>
          <ProfileUserSkeleton />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              elevation: 1,
              marginTop: 10,
              marginHorizontal: 20,
            }}>
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
              {AuthState.user.name ? AuthState.user.name[0] : '?'}
            </Text>

            <View>
              <Text
                numberOfLines={1}
                style={{color: 'black', fontWeight: 'bold'}}>
                {AuthState.user.last_name1 +
                  ' ' +
                  AuthState.user.last_name2 +
                  ' ' +
                  AuthState.user.name}
              </Text>
              <Text style={{color: 'gray'}}>{AuthState.user.email}</Text>
            </View>
          </View>

          <InfoTouchables
            onPress={() => navigation.navigate('NAME_USER')}
            title="Nombre completo"
            value={
              AuthState.user.last_name1 +
              ' ' +
              AuthState.user.last_name2 +
              ' ' +
              AuthState.user.name
            }
          />

          <InfoTouchables
            onPress={() => navigation.navigate('EMAIL_USER')}
            title="Correo"
            value={AuthState.user.email}
          />

          <InfoTouchables
            onPress={() => navigation.navigate('PHONE_USER')}
            title="Celular"
            value={AuthState.user.phone ?? 'No registrado'}
          />

          <InfoTouchables
            onPress={() => navigation.navigate('ADDRESS_USER')}
            title="Dirección"
            value={
              (AuthState.user.province?.name ?? '- - - -') +
              ', ' +
              (AuthState.user.canton?.name ?? '- - - -') +
              ', ' +
              (AuthState.user.parish?.name ?? '- - - -')
            }
          />

          <InfoTouchables
            onPress={() => navigation.navigate('PASSWORD_USER')}
            title="Contraseña"
            value="*********"
          />

          <InfoTouchables
            onPress={() => navigation.navigate('PetProfileStack')}
            title={`Mis mascotas (${formatNumber(
              AuthState.user.pets?.length ?? 0,
            )})`}
          />
        </View>
      )}
      <FooterUTM />
    </ScrollView>
  )
}

export default UserProfile

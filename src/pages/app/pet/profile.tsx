import React, {useContext, useEffect} from 'react'
import {ScrollView, View, Text} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import {FooterUTM} from '@src/components'
import InfoTouchables from '@src/components/profiles/InfoTouchables'
import AuthContext from '@src/contexts/auth/AuthContext'
import ConfigContext from '@src/contexts/config/ConfigContext'
import {GET_USER_PROFILE} from '@src/services/user'
import {formatNumber, getSex} from '@src/utils/format'
import {getDateDiffBirth} from '@src/utils/date'
import {pet} from '@src/types/declare'

const UserProfile = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState, setDataUser} = useContext(AuthContext)
  const {ConfigState, toggleLoading} = useContext(ConfigContext)

  const getProfile = async () => {
    toggleLoading(true)
    const res = await GET_USER_PROFILE(
      AuthState.user.user_id,
      AuthState.user.api_token,
    )
    if (res.status === 200) {
      const data = await res.json()
      setDataUser(data.user)
    }
    toggleLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <ScrollView style={{flex: 1, backgroundColor: AppStyles.color.bg_low_gray}}>
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
            {pet.name ? pet.name[0] : 'N'}
          </Text>

          <View>
            <Text
              numberOfLines={1}
              style={{color: 'black', fontWeight: 'bold'}}>
              {pet.name}
            </Text>
            <Text style={{color: 'gray'}}>{pet.pet_id}</Text>
          </View>
        </View>

        <InfoTouchables
          onPress={() => navigation.navigate('NAME_PET')}
          title="Nombre"
          value={pet.name}
        />

        <InfoTouchables
          onPress={() => navigation.navigate('SPECIE_RACE_FUR_PET')}
          title="Especie, raza y pelaje"
          value={
            (pet.specie?.name || '----') +
            ', ' +
            (pet.race?.name || '----') +
            ', ' +
            (pet.fur?.name || '----')
          }
        />

        <InfoTouchables
          onPress={() => navigation.navigate('BIRTH_PET')}
          title="Edad"
          value={pet.birth ? getDateDiffBirth(pet.birth) : 'Sin definir'}
        />

        <InfoTouchables
          onPress={() => navigation.navigate('SEX_PET')}
          title="Sexo"
          value={pet.sex ? getSex(pet.sex) : 'Sin definir'}
        />

        <InfoTouchables
          onPress={() => navigation.navigate('CASTRATED_PET')}
          title="Castrado"
          value={pet.castrated ? 'Si' : 'No'}
        />

        <InfoTouchables
          onPress={() => navigation.navigate('LOST_PET')}
          title="Perdido"
          value={pet.lost ? 'Si' : 'No'}
        />

        <InfoTouchables
          onPress={() => navigation.navigate('CHARACTERISTIC_PET')}
          title="Caratacteristicas"
          value={pet.characteristic}
        />
      </View>

      <FooterUTM />
    </ScrollView>
  )
}

export default UserProfile

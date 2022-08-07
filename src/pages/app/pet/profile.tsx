import React, {useContext} from 'react'
import {ScrollView, View, Text, TouchableOpacity, Alert} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import {FooterUTM} from '@src/components'
import InfoTouchables from '@src/components/profiles/InfoTouchables'
import {getSex} from '@src/utils/format'
import {getDateDiffBirth} from '@src/utils/date'
import {pet} from '@src/types/declare'
import RowDeleteIcon from '@src/components/icons/RowDelete'
import AuthContext from '@src/contexts/auth/AuthContext'
import ConfigContext from '@src/contexts/config/ConfigContext'
import useAuth from '@src/hooks/useAuth'

const UserProfile = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {ConfigState} = useContext(ConfigContext)
  const {UPDATED_PET} = useAuth()

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

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                style={{color: 'black', fontWeight: 'bold'}}>
                {pet.name}
              </Text>
              <Text style={{color: 'gray'}}>{pet.pet_id}</Text>
            </View>
            <TouchableOpacity
              disabled={ConfigState.loading}
              onPress={() => {
                Alert.alert(
                  'Eliminar',
                  '¿Desea eliminar este animal?\n' +
                    'Nombre: ' +
                    pet.name +
                    '\n' +
                    'Identificación: ' +
                    pet.pet_id,
                  [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                      text: 'Eliminar',
                      onPress: () => {
                        const data = new FormData()
                        data.append('pet_id', pet.pet_id)
                        data.append('user_id', AuthState.user.user_id)
                        data.append('new_user_id', null)
                        UPDATED_PET(data, AuthState.user.api_token)
                          .then((res: any) => {
                            if (res.type === 'success') {
                              navigation.navigate('USER_PROFILE')
                            }
                          })
                          .catch((err: any) => {
                            console.log(err)
                          })
                      },
                    },
                  ],
                )
              }}>
              <View style={{paddingHorizontal: 10}}>
                <RowDeleteIcon
                  width={20}
                  height={20}
                  fill={AppStyles.color.error}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <InfoTouchables
          onPress={() =>
            navigation.navigate('NAME_PET', {
              name: pet.name,
              pet,
            })
          }
          title="Nombre"
          value={pet.name}
        />

        <InfoTouchables
          onPress={() =>
            navigation.navigate('SPECIE_RACE_FUR_PET', {
              specie: pet.specie,
              race: pet.race,
              fur: pet.fur,
              pet,
            })
          }
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
          onPress={() =>
            navigation.navigate('BIRTH_PET', {
              pet,
            })
          }
          title="Edad"
          value={pet.birth ? getDateDiffBirth(pet.birth) : 'Sin definir'}
        />

        <InfoTouchables
          onPress={() =>
            navigation.navigate('SEX_PET', {
              pet,
            })
          }
          title="Sexo"
          value={pet.sex ? getSex(pet.sex) : 'Sin definir'}
        />

        <InfoTouchables
          onPress={() =>
            navigation.navigate('CASTRATED_PET', {
              pet,
            })
          }
          title="Castrado"
          value={pet.castrated ? 'Si' : 'No'}
        />

        <InfoTouchables
          onPress={() =>
            navigation.navigate('LOST_PET', {
              pet,
            })
          }
          title="Perdido"
          value={pet.lost ? 'Si' : 'No'}
        />

        <InfoTouchables
          onPress={() =>
            navigation.navigate('CHARACTERISTIC_PET', {
              pet,
            })
          }
          title="Caratacteristicas"
          value={pet.characteristic}
        />
      </View>

      <FooterUTM />
    </ScrollView>
  )
}

export default UserProfile

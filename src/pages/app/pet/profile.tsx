import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import {FooterUTM} from '@src/components'
import InfoTouchables from '@src/components/profiles/InfoTouchables'
import {getSex} from '@src/utils/format'
import {getDateDiffBirth} from '@src/utils/date'
import {pet} from '@src/types/declare'

const UserProfile = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}

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

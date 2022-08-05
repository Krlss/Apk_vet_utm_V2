import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ProfilePetStackProps} from '@src/types/declare'
import NameChange from '@src/pages/app/pet/name_change'
import PetProfile from '@src/pages/app/pet/profile'
import PetsUser from '@src/pages/app/user/pets_user'
import SpecieRaceFur from '@src/pages/app/pet/specie_race_fur'
import BirthPage from '@src/pages/app/pet/birth'
import SexPage from '@src/pages/app/pet/sex'
import LostPage from '@src/pages/app/pet/lost'
import CharateristicPage from '@src/pages/app/pet/characteristic'
import CastratedPage from '@src/pages/app/pet/castrated'
import Photos from '@src/components/photos/Photos'

const Stack = createNativeStackNavigator<ProfilePetStackProps>()

const PetProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PETS_USER"
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="PETS_USER"
        component={PetsUser}
        options={{
          title: 'Mis mascotas',
        }}
      />
      <Stack.Screen
        name="PET_PROFILE"
        component={PetProfile}
        options={{title: 'Perfil de mi mascota'}}
      />

      <Stack.Screen
        name="NAME_PET"
        component={NameChange}
        options={{title: 'Cambiar nombre de la mascota'}}
      />
      <Stack.Screen
        name="SPECIE_RACE_FUR_PET"
        component={SpecieRaceFur}
        options={{title: 'Cambiar especie, raza y pelaje'}}
      />
      <Stack.Screen
        name="BIRTH_PET"
        component={BirthPage}
        options={{title: 'Cambiar Fecha de nacimiento'}}
      />
      <Stack.Screen
        name="SEX_PET"
        component={SexPage}
        options={{title: 'Cambiar sexo'}}
      />
      <Stack.Screen
        name="CASTRATED_PET"
        component={CastratedPage}
        options={{title: 'Cambiar castrado'}}
      />
      <Stack.Screen
        name="LOST_PET"
        component={LostPage}
        options={{title: 'Cambiar a perdido'}}
      />
      <Stack.Screen
        name="PHOTOS_PET"
        component={Photos}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CHARACTERISTIC_PET"
        component={CharateristicPage}
        options={{title: 'Cambiar caracteristicas'}}
      />
    </Stack.Navigator>
  )
}
export default PetProfileStack

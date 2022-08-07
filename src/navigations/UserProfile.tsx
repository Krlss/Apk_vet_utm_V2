import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ProfileUserStackProps} from '@src/types/declare'
import NameChange from '@src/pages/app/user/name_change'
import EmailChange from '@src/pages/app/user/email_change'
import PhoneChange from '@src/pages/app/user/phone_change'
import AddressChange from '@src/pages/app/user/address_change'
import PasswordChange from '@src/pages/app/user/password_change'
import UserProfile from '@src/pages/app/user/profile'
import Header from '@src/components/headers/Header'
import PetProfileStack from './PetProfile'
import ReportProvider from '@src/contexts/report/ReportProvider'
import AddNewPet from '@src/pages/app/pet/AddNewPet'

const Stack = createNativeStackNavigator<ProfileUserStackProps>()

const UserProfileStack = () => {
  return (
    <ReportProvider>
      <Stack.Navigator
        initialRouteName="USER_PROFILE"
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="USER_PROFILE"
          component={UserProfile}
          options={{
            title: 'Mi perfil',
            header: props => <Header {...props} />,
          }}
        />
        <Stack.Screen
          name="NAME_USER"
          component={NameChange}
          options={{title: 'Cambiar nombres completos'}}
        />
        <Stack.Screen
          name="EMAIL_USER"
          component={EmailChange}
          options={{title: 'Cambiar correo electrónico'}}
        />
        <Stack.Screen
          name="PHONE_USER"
          component={PhoneChange}
          options={{title: 'Cambiar teléfono'}}
        />
        <Stack.Screen
          name="ADDRESS_USER"
          component={AddressChange}
          options={{title: 'Cambiar dirección'}}
        />
        <Stack.Screen
          name="PASSWORD_USER"
          component={PasswordChange}
          options={{title: 'Cambiar contraseña'}}
        />
        <Stack.Screen
          name="ADD_NEW_PET"
          component={AddNewPet}
          options={{title: 'Agregar nueva mascota'}}
        />
        <Stack.Screen
          name="PetProfileStack"
          component={PetProfileStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ReportProvider>
  )
}
export default UserProfileStack

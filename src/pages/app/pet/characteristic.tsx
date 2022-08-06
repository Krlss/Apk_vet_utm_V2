import React, {useContext} from 'react'
import {View, ScrollView} from 'react-native'
import {useFormik} from 'formik'
import InputNormal from '@src/components/inputs/InputNormal'
import LongButton from '@src/components/buttons/LongButton'
import {CharacteristicPetProfile} from '@src/schemas/schemas'
import {pet} from '@src/types/declare'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'

const CharacteristicPage = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_PET} = useAuth()

  const formik = useFormik({
    initialValues: {
      characteristic: pet.characteristic,
    },
    validationSchema: CharacteristicPetProfile,
    onSubmit: async values => {
      if (pet.characteristic != values.characteristic) {
        const data = new FormData()
        data.append('characteristic', values.characteristic)
        data.append('pet_id', pet.pet_id)
        data.append('user_id', AuthState.user.user_id)
        UPDATED_PET(data, AuthState.user.api_token)
          .then((res: any) => {
            if (res.type === 'success') {
              navigation.navigate('USER_PROFILE')
            }
          })
          .catch((err: any) => {
            console.log(err)
          })
      }
    },
  })
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <InputNormal
          style={{
            height: 100,
            textAlignVertical: 'top',
          }}
          value={formik.values.characteristic}
          placeholder="Nombre"
          onChangeText={formik.handleChange('characteristic')}
          error={formik.errors.characteristic}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={
          formik.isValid && pet.characteristic != formik.values.characteristic
        }
      />
    </ScrollView>
  )
}

export default CharacteristicPage

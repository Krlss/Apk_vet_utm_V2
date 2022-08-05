import React, {useContext} from 'react'
import {View, ScrollView} from 'react-native'
import {useFormik} from 'formik'
import InputNormal from '@src/components/inputs/InputNormal'
import LongButton from '@src/components/buttons/LongButton'
import {NamePetProfile} from '@src/schemas/schemas'
import {pet} from '@src/types/declare'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'

const NameChange = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_PET} = useAuth()

  const formik = useFormik({
    initialValues: {
      name: pet.name,
    },
    validationSchema: NamePetProfile,
    onSubmit: async values => {
      if (pet.name != values.name) {
        const {name, ...otherValues} = pet
        const data = {
          ...otherValues,
          name: values.name,
        }
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
          value={formik.values.name}
          placeholder="Nombre"
          onChangeText={formik.handleChange('name')}
          error={formik.errors.name}
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid && pet.name != formik.values.name}
      />
    </ScrollView>
  )
}

export default NameChange

import React, {useContext, useState} from 'react'
import {View, ScrollView, TouchableOpacity, Text} from 'react-native'
import {useFormik} from 'formik'
import InputNormal from '@src/components/inputs/InputNormal'
import LongButton from '@src/components/buttons/LongButton'
import {BirthPetProfile} from '@src/schemas/schemas'
import {pet} from '@src/types/declare'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'
import DateTimePicker from '@react-native-community/datetimepicker'
import AppStyles from '@src/themes/AppStyles'
import {getDateDiffBirth} from '@src/utils/date'

const BirthPage = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: pet}
  const {AuthState} = useContext(AuthContext)
  const {UPDATED_PET} = useAuth()
  const [modalBirth, setModalBirth] = useState(false)

  const formik = useFormik({
    initialValues: {
      birth: pet.birth,
    },
    validationSchema: BirthPetProfile,
    onSubmit: async values => {
      if (pet.name != values.birth) {
        const data = new FormData()
        data.append('birth', values.birth)
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
        <TouchableOpacity onPress={() => setModalBirth(true)}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: AppStyles.color.bg_low_gray,
              color: formik.values.birth ? 'black' : AppStyles.color.gray,
              borderRadius: 10,
              borderColor: AppStyles.color.low_gray,
              borderWidth: 1,
              textAlignVertical: 'center',
              marginVertical: 5,
            }}>
            {formik.values.birth ?? 'Selecciona una fecha de nacimiento'}
            {formik.values.birth &&
              ' (' + getDateDiffBirth(formik.values.birth) + ')'}
          </Text>
        </TouchableOpacity>
        {formik.errors.birth && (
          <Text
            style={{
              color: AppStyles.color.error,
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 10,
            }}>
            {formik.errors.birth}
          </Text>
        )}
      </View>

      {modalBirth && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={new Date(formik.values.birth || pet?.birth || new Date())}
          maximumDate={new Date()}
          minimumDate={new Date('1995-01-01')}
          onChange={(event, date) => {
            if (date) {
              setModalBirth(false)
              date.setDate(date.getDate() - 1)
              formik.setFieldValue('birth', date.toISOString().split('T')[0])
            }
          }}
        />
      )}
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid && pet.birth != formik.values.birth}
      />
    </ScrollView>
  )
}

export default BirthPage

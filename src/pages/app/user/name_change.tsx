import React, {useContext} from 'react'
import {View, ScrollView} from 'react-native'
import {useFormik} from 'formik'
import InputNormal from '@src/components/inputs/InputNormal'
import LongButton from '@src/components/buttons/LongButton'
import {NameUserProfile} from '@src/schemas/schemas'
import AuthContext from '@src/contexts/auth/AuthContext'
import {separateFullname} from '@src/utils/utils'
import useAuth from '@src/hooks/useAuth'

const NameChange = ({navigation, route}: any) => {
  const {AuthState} = useContext(AuthContext)
  const fullname = `${AuthState.user.last_name1} ${AuthState.user.last_name2} ${AuthState.user.name}`
  const {UPDATED_USER} = useAuth()
  const formik = useFormik({
    initialValues: {
      fullname: fullname,
    },
    validationSchema: NameUserProfile,
    onSubmit: async values => {
      if (fullname != values.fullname) {
        const [name, last_name1, last_name2] = separateFullname(values.fullname)
        const data = {
          ...AuthState.user,
          name,
          last_name1,
          last_name2,
        }
        UPDATED_USER(data, AuthState.user.api_token).then((res: any) => {
          if (res.type === 'success') {
            navigation.goBack()
          }
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
          value={formik.values.fullname}
          placeholder="Nombre"
          onChangeText={formik.handleChange('fullname')}
          error={formik.errors.fullname}
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid && fullname != formik.values.fullname}
      />
    </ScrollView>
  )
}

export default NameChange

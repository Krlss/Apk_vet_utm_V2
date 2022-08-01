import React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import SheetPicker from '@src/components/select/SheetPicker'
import AppStyles from '@src/themes/AppStyles'
import {useFormik} from 'formik'
import useAuth from '@src/hooks/useAuth'
import {AddressUserProfile} from '@src/schemas/schemas'
import useAddressUser from '@src/hooks/useAddressUser'
import LongButton from '@src/components/buttons/LongButton'

const AddressChange = ({navigation, route}: any) => {
  const {
    cantons,
    data,
    handleChangeCanton,
    handleChangeParish,
    handleChangeProvince,
    modalCanton,
    modalParish,
    modalProvince,
    parishes,
    provinces,
    setModalCanton,
    setModalParish,
    setModalProvince,
    AuthState,
  } = useAddressUser()

  const {UPDATED_USER} = useAuth()
  const formik = useFormik({
    initialValues: {
      province: AuthState.user.province?.name,
      canton: AuthState.user.canton?.name,
      parish: AuthState.user.parish?.name,
    },
    validationSchema: AddressUserProfile,
    onSubmit: async values => {
      const data_ = {
        ...AuthState.user,
        id_province: data.id_province,
        id_canton: data.id_canton,
        id_parish: data.id_parish,
      }
      UPDATED_USER(data_, AuthState.user.api_token).then((res: any) => {
        if (res.type === 'success') {
          navigation.goBack()
        }
      })
    },
  })

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => setModalProvince(true)}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: AppStyles.color.bg_low_gray,
              color: formik.values.province ? 'black' : AppStyles.color.gray,
              borderRadius: 10,
              borderColor: AppStyles.color.low_gray,
              borderWidth: 1,
              textAlignVertical: 'center',
              marginVertical: 5,
            }}>
            {formik.values.province ?? 'Selecciona una provincia'}
          </Text>
        </TouchableOpacity>
        {formik.errors.province && (
          <Text
            style={{
              color: AppStyles.color.error,
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 10,
            }}>
            {formik.errors.province}
          </Text>
        )}

        <SheetPicker
          data={provinces}
          closeModal={() => setModalProvince(false)}
          modalVisible={modalProvince}
          onChange={(string: string) => {
            formik.setFieldValue('province', string)
            formik.setFieldValue('canton', undefined)
            formik.setFieldValue('parish', undefined)
          }}
          onPress={(id: number, string: string) =>
            handleChangeProvince(id, string)
          }
          label="Provincias"
        />

        <TouchableOpacity
          onPress={() => setModalCanton(true)}
          disabled={!formik.values.province}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: AppStyles.color.bg_low_gray,
              color: formik.values.canton ? 'black' : AppStyles.color.gray,
              borderRadius: 10,
              borderColor: AppStyles.color.low_gray,
              borderWidth: 1,
              textAlignVertical: 'center',
              marginVertical: 5,
            }}>
            {formik.values.canton ?? 'Selecciona un cantón'}
          </Text>
        </TouchableOpacity>
        {formik.errors.canton && (
          <Text
            style={{
              color: AppStyles.color.error,
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 10,
            }}>
            {formik.errors.canton}
          </Text>
        )}

        <SheetPicker
          data={cantons}
          closeModal={() => setModalCanton(false)}
          modalVisible={modalCanton}
          onChange={(string: string) => {
            formik.setFieldValue('canton', string)
            formik.setFieldValue('parish', undefined)
          }}
          onPress={(id: number, string: string) =>
            handleChangeCanton(id, string)
          }
          label="Cantones"
        />

        <TouchableOpacity
          onPress={() => setModalParish(true)}
          disabled={!formik.values.canton}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: AppStyles.color.bg_low_gray,
              color: formik.values.parish ? 'black' : AppStyles.color.gray,
              borderRadius: 10,
              borderColor: AppStyles.color.low_gray,
              borderWidth: 1,
              textAlignVertical: 'center',
              marginVertical: 5,
            }}>
            {formik.values.parish ?? 'Selecciona una parroquia'}
          </Text>
        </TouchableOpacity>
        {formik.errors.parish && (
          <Text
            style={{
              color: AppStyles.color.error,
              fontSize: 12,
              marginTop: 5,
              marginHorizontal: 10,
            }}>
            {formik.errors.parish}
          </Text>
        )}

        <SheetPicker
          data={parishes}
          closeModal={() => setModalParish(false)}
          modalVisible={modalParish}
          onChange={(string: string) => formik.setFieldValue('parish', string)}
          onPress={(id: number, string: string) =>
            handleChangeParish(id, string)
          }
          label="Parriquias"
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid}
      />
    </ScrollView>
  )
}

export default AddressChange

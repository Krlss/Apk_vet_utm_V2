import React, {useState, useContext} from 'react'
import {ScrollView, Text, TouchableOpacity} from 'react-native'
import {useFormik} from 'formik'
import {InputFloatingLabel} from '@src/components'
import ProvinceIcon from '@src/components/icons/Province'
import CantonIcon from '@src/components/icons/Canton'
import ParishIcon from '@src/components/icons/Parish'
import InputFloatingWithIconRight from '@src/components/inputs/InputFloatingWithIconRight'
import SheetPicker from '@src/components/select/SheetPicker'
import {KnownUserSchema} from '@src/schemas/schemas'
import ReportContext from '@src/contexts/report/ReportContext'
import AppStyles from '@src/themes/AppStyles'

interface Props {
  nextPosition: () => void
  provinces: any
  cantons: any
  parishes: any
  handleProvinceChange: (id: number, text: string) => void
  handleCantonChange: (id: number, text: string) => void
  handleParisheChange: (id: number, text: string) => void
}

const UserDataReport = ({
  nextPosition,
  cantons,
  parishes,
  provinces,
  handleProvinceChange,
  handleCantonChange,
  handleParisheChange,
}: Props) => {
  const [modalVisibleProvince, setModalVisibleProvince] = useState(false)
  const [modalVisibleCanton, setModalVisibleCanton] = useState(false)
  const [modalVisibleParish, setModalVisibleParish] = useState(false)
  const {ReportState, setUser} = useContext(ReportContext)
  const {user} = ReportState

  const formik = useFormik({
    initialValues: {
      user_id: user?.user_id,
      fullname: user?.fullname,
      email: user?.email,
      phone: user?.phone,
      province: user?.province?.name,
      canton: user?.canton?.name,
      parish: user?.parish?.name,
    },
    validationSchema: KnownUserSchema,
    onSubmit: nextPosition,
  })

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value)
    setUser({...user, [name]: value})
  }

  const handleChangeSelect = (name: string, value: string) => {
    if (name === 'province') {
      formik.setFieldValue('canton', undefined)
      formik.setFieldValue('parish', undefined)
    } else if (name === 'canton') {
      formik.setFieldValue('parish', undefined)
    }
    formik.setFieldValue(name, value)
  }
  return (
    <ScrollView>
      <InputFloatingLabel
        label="CI/RUC"
        keyboardType="numeric"
        onChange={value => handleChange('user_id', value)}
        error={formik.errors.user_id}
        value={user?.user_id}
      />

      <InputFloatingLabel
        label="Nombres completos"
        autoCapitalize="words"
        onChange={value => handleChange('fullname', value)}
        error={formik.errors.fullname}
        value={user?.fullname}
      />

      <InputFloatingLabel
        label="Correo electrónico"
        onChange={value => handleChange('email', value)}
        error={formik.errors.email}
        value={user?.email}
        autoComplete="email"
      />
      <InputFloatingLabel
        label="Teléfono"
        keyboardType="numeric"
        autoComplete="tel"
        onChange={value => handleChange('phone', value)}
        error={formik.errors.phone}
        value={user?.phone}
      />

      <InputFloatingWithIconRight
        label="Provincia"
        value={user?.province?.name}
        editable={false}
        error={formik.errors.province}
        onPress={() => setModalVisibleProvince(true)}>
        <ProvinceIcon fill="white" height={20} width={20} />
      </InputFloatingWithIconRight>

      <SheetPicker
        modalVisible={modalVisibleProvince}
        closeModal={() => setModalVisibleProvince(false)}
        label="Selecciona una provincia"
        onPress={handleProvinceChange}
        onChange={value => handleChangeSelect('province', value)}
        data={provinces}
      />

      <InputFloatingWithIconRight
        label="Canton"
        value={user?.canton?.name}
        editable={false}
        error={formik.errors.canton}
        disabled={user?.province?.name ? false : true}
        onPress={() => setModalVisibleCanton(true)}>
        <CantonIcon fill="white" height={20} width={20} />
      </InputFloatingWithIconRight>

      <SheetPicker
        modalVisible={modalVisibleCanton}
        closeModal={() => setModalVisibleCanton(false)}
        label="Selecciona un cantón"
        onPress={handleCantonChange}
        onChange={value => handleChangeSelect('canton', value)}
        data={cantons}
      />

      <InputFloatingWithIconRight
        label="Parroquia"
        value={user?.parish?.name}
        editable={false}
        error={formik.errors.parish}
        disabled={user?.canton?.name ? false : true}
        onPress={() => setModalVisibleParish(true)}>
        <ParishIcon fill="white" height={20} width={20} />
      </InputFloatingWithIconRight>

      <SheetPicker
        modalVisible={modalVisibleParish}
        closeModal={() => setModalVisibleParish(false)}
        label="Selecciona una parroquia"
        onPress={handleParisheChange}
        onChange={value => handleChangeSelect('parish', value)}
        data={parishes}
      />

      <TouchableOpacity
        disabled={!formik.isValid}
        onPress={formik.handleSubmit}
        style={{
          opacity: formik.isValid ? 1 : 0.5,
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
          marginVertical: 20,
          padding: 10,
          backgroundColor: AppStyles.color.info,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default UserDataReport

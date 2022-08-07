import React, {useState, useContext} from 'react'
import {View, ScrollView, TouchableOpacity, Text, Modal} from 'react-native'
import {useFormik} from 'formik'
import InputNormal from '@src/components/inputs/InputNormal'
import LongButton from '@src/components/buttons/LongButton'
import {NewPet} from '@src/schemas/schemas'
import useAuth from '@src/hooks/useAuth'
import AuthContext from '@src/contexts/auth/AuthContext'
import ConfigContext from '@src/contexts/config/ConfigContext'
import SheetPicker from '@src/components/select/SheetPicker'
import AppStyles from '@src/themes/AppStyles'
import {getDateDiffBirth} from '@src/utils/date'
import {getSex} from '@src/utils/format'
import DateTimePicker from '@react-native-community/datetimepicker'
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group'
import {SEX_CHECK, CASTRATED_CHECK} from '@src/constants/globals'

const CharacteristicPage = ({navigation, route}: any) => {
  const {AuthState} = useContext(AuthContext)
  const {ConfigState} = useContext(ConfigContext)
  const {CREATED_PET} = useAuth()

  const [modalSpecie, setModalSpecie] = useState(false)
  const [modalRace, setModalRace] = useState(false)
  const [modalFur, setModalFur] = useState(false)

  const [species, setSpecies] = useState(ConfigState.species)
  const [races, setRaces] = useState(ConfigState.races)
  const [furs, setFurs] = useState(ConfigState.furs)
  const [modalBirth, setModalBirth] = useState(false)
  const [modalSex, setModalSex] = useState(false)
  const [modalCastrated, setModalCastrated] = useState(false)

  const [data, setData] = useState<{
    id_specie?: number
    id_race?: number
    id_fur?: number
  }>({
    id_specie: undefined,
    id_race: undefined,
    id_fur: undefined,
  })

  const formik = useFormik({
    initialValues: {
      name: undefined,
      id_specie: undefined,
      id_race: undefined,
      id_fur: undefined,
      birth: undefined,
      sex: undefined,
      castrated: undefined,
      characteristic: undefined,
    },
    validationSchema: NewPet,
    onSubmit: async values => {
      const {id_specie, id_fur, id_race, ...otherValues} = values
      const data_ = {
        ...otherValues,
        id_specie: data.id_specie,
        id_race: data.id_race,
        id_fur: data.id_fur,
      }
      CREATED_PET(data_, AuthState.user.api_token)
        .then((res: any) => {
          if (res.type === 'success') {
            navigation.navigate('USER_PROFILE')
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
  })

  const selectedSex = SEX_CHECK.findIndex(
    item => item.value === formik.values.sex,
  )
  const selectedCastrated = CASTRATED_CHECK.findIndex(
    item => item.value === formik.values.castrated,
  )

  const handleChangeSpecie = (value: number) => {
    setData({
      ...data,
      id_specie: Number(value),
      id_race: undefined,
      id_fur: undefined,
    })
    setRaces(ConfigState.races.filter(e => e.id_specie === Number(value)))
    setFurs(
      ConfigState.furs.filter(e =>
        e.id_specie.find(element => element === value),
      ),
    )
  }

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{
        padding: 20,
      }}>
      <InputNormal
        value={formik.values.name}
        placeholder="Nombre"
        onChangeText={formik.handleChange('name')}
        error={formik.errors.name}
      />

      <TouchableOpacity onPress={() => setModalSpecie(true)}>
        <Text
          style={{
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: AppStyles.color.bg_low_gray,
            color: formik.values.id_specie ? 'black' : AppStyles.color.gray,
            borderRadius: 10,
            borderColor: AppStyles.color.low_gray,
            borderWidth: 1,
            textAlignVertical: 'center',
            marginVertical: 5,
          }}>
          {formik.values.id_specie ?? 'Selecciona una especie'}
        </Text>
      </TouchableOpacity>
      {formik.errors.id_specie && (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: 12,
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {formik.errors.id_specie}
        </Text>
      )}

      <SheetPicker
        data={species}
        closeModal={() => setModalSpecie(false)}
        modalVisible={modalSpecie}
        onChange={(string: string) => {
          formik.setFieldValue('id_specie', string)
          formik.setFieldValue('id_race', undefined)
          formik.setFieldValue('id_fur', undefined)
        }}
        onPress={(id: number, string: string) => handleChangeSpecie(id)}
        label="Especies"
      />

      <TouchableOpacity
        onPress={() => setModalRace(true)}
        disabled={!formik.values.id_specie}>
        <Text
          style={{
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: AppStyles.color.bg_low_gray,
            color: formik.values.id_race ? 'black' : AppStyles.color.gray,
            borderRadius: 10,
            borderColor: AppStyles.color.low_gray,
            borderWidth: 1,
            textAlignVertical: 'center',
            marginVertical: 5,
          }}>
          {formik.values.id_race ?? 'Selecciona una raza'}
        </Text>
      </TouchableOpacity>
      {formik.errors.id_race && (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: 12,
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {formik.errors.id_race}
        </Text>
      )}

      <SheetPicker
        data={races}
        closeModal={() => setModalRace(false)}
        modalVisible={modalRace}
        onChange={(string: string) => {
          formik.setFieldValue('id_race', string)
        }}
        onPress={(id: number, string: string) =>
          setData({...data, id_race: id})
        }
        label="Razas"
      />

      <TouchableOpacity
        onPress={() => setModalFur(true)}
        disabled={!formik.values.id_specie}>
        <Text
          style={{
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: AppStyles.color.bg_low_gray,
            color: formik.values.id_fur ? 'black' : AppStyles.color.gray,
            borderRadius: 10,
            borderColor: AppStyles.color.low_gray,
            borderWidth: 1,
            textAlignVertical: 'center',
            marginVertical: 5,
          }}>
          {formik.values.id_fur ?? 'Selecciona un pelaje'}
        </Text>
      </TouchableOpacity>
      {formik.errors.id_fur && (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: 12,
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {formik.errors.id_fur}
        </Text>
      )}

      <SheetPicker
        data={furs}
        closeModal={() => setModalFur(false)}
        modalVisible={modalFur}
        onChange={(string: string) => formik.setFieldValue('id_fur', string)}
        onPress={(id: number, string: string) => setData({...data, id_fur: id})}
        label="Pelajes"
      />

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

      {modalBirth && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={new Date(formik.values.birth || new Date())}
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

      <TouchableOpacity onPress={() => setModalSex(true)}>
        <Text
          style={{
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: AppStyles.color.bg_low_gray,
            color: formik.values.sex ? 'black' : AppStyles.color.gray,
            borderRadius: 10,
            borderColor: AppStyles.color.low_gray,
            borderWidth: 1,
            textAlignVertical: 'center',
            marginVertical: 5,
          }}>
          {!formik.values.sex ? 'Selecciona un sexo' : null}
          {formik.values.sex && getSex(formik.values.sex)}
        </Text>
      </TouchableOpacity>
      {formik.errors.sex && (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: 12,
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {formik.errors.sex}
        </Text>
      )}

      <Modal visible={modalSex}>
        <BouncyCheckboxGroup
          data={SEX_CHECK}
          initial={selectedSex}
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
          }}
          onChange={(selectedItem: any) => {
            formik.setFieldValue('sex', selectedItem.value)
            setModalSex(false)
          }}
        />
      </Modal>

      <TouchableOpacity onPress={() => setModalCastrated(true)}>
        <Text
          style={{
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: AppStyles.color.bg_low_gray,
            color:
              formik.values.castrated != undefined
                ? 'black'
                : AppStyles.color.gray,
            borderRadius: 10,
            borderColor: AppStyles.color.low_gray,
            borderWidth: 1,
            textAlignVertical: 'center',
            marginVertical: 5,
          }}>
          {formik.values.castrated == undefined ? '¿está castrado?' : null}
          {formik.values.castrated != undefined
            ? formik.values.castrated
              ? 'Si'
              : 'No'
            : null}
        </Text>
      </TouchableOpacity>
      {formik.errors.castrated && (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: 12,
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {formik.errors.castrated}
        </Text>
      )}

      <Modal visible={modalCastrated}>
        <BouncyCheckboxGroup
          data={CASTRATED_CHECK}
          initial={selectedCastrated}
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
          }}
          onChange={(selectedItem: any) => {
            formik.setFieldValue('castrated', selectedItem.value)
            setModalCastrated(false)
          }}
        />
      </Modal>

      <InputNormal
        style={{
          height: 100,
          textAlignVertical: 'top',
        }}
        value={formik.values.characteristic}
        placeholder="Características"
        onChangeText={formik.handleChange('characteristic')}
        error={formik.errors.characteristic}
        multiline={true}
        numberOfLines={4}
      />
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={formik.isValid}
      />
    </ScrollView>
  )
}

export default CharacteristicPage

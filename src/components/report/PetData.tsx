import React, {useState, useContext} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useFormik} from 'formik'
import {InputFloatingLabel} from '@src/components'
import SpecieIcon from '@src/components/icons/Specie'
import RaceIcon from '@src/components/icons/Race'
import CalendarIcon from '@src/components/icons/Calendar'
import IntersexIcon from '@src/components/icons/intersex'
import InputFloatingWithIconRight from '@src/components/inputs/InputFloatingWithIconRight'
import InputFloatingWithCheckRight from '../inputs/InputFloatingWithCheckRight'
import SheetPicker from '@src/components/select/SheetPicker'
import SheetSexPicker from '../select/SheetSexPicker'
import {KnownPetSchema} from '@src/schemas/schemas'
import ReportContext from '@src/contexts/report/ReportContext'
import AppStyles from '@src/themes/AppStyles'
import DateTimePicker from '@react-native-community/datetimepicker'

interface Props {
  nextPosition: () => void
  prevPosition: () => void
  species: any
  races: any
  handleSpecieChange: (id: number, text: string) => void
  handleRaceChange: (id: number, text: string) => void
}

const PetDataReport = ({
  nextPosition,
  prevPosition,
  species,
  races,
  handleSpecieChange,
  handleRaceChange,
}: Props) => {
  const [modalVisibleSpecie, setModalVisibleSpecie] = useState(false)
  const [modalVisibleRace, setModalVisibleRace] = useState(false)
  const [modalVisibleBirth, setModalVisibleBirth] = useState(false)
  const [modalVisibleSex, setModalVisibleSex] = useState(false)
  const {ReportState, setPet} = useContext(ReportContext)
  const {pet} = ReportState

  const formik = useFormik({
    initialValues: {
      name: pet?.name,
      specie: pet?.specie?.name,
      race: pet?.race?.name,
      birth: pet?.birth,
      sex: pet?.sex,
      castrated: pet?.castrated,
      characteristic: pet?.characteristic,
    },
    validationSchema: KnownPetSchema,
    onSubmit: nextPosition,
  })

  const handleChange = (name: string, value?: string) => {
    formik.setFieldValue(name, value)
    setPet({...pet, [name]: value})
  }

  const handleChangeSelect = (name: string, value: string) => {
    if (name === 'specie') {
      formik.setFieldValue('race', undefined)
    }
    formik.setFieldValue(name, value)
  }
  return (
    <ScrollView>
      <InputFloatingLabel
        label="Nombre"
        onChange={value => handleChange('name', value)}
        error={formik.errors.name}
        value={pet?.name}
      />

      <InputFloatingWithIconRight
        label="Especie"
        value={pet?.specie?.name}
        editable={false}
        error={formik.errors.specie}
        onPress={() => setModalVisibleSpecie(true)}>
        <SpecieIcon fill="white" height={20} width={20} />
      </InputFloatingWithIconRight>

      <SheetPicker
        modalVisible={modalVisibleSpecie}
        closeModal={() => setModalVisibleSpecie(false)}
        label="Selecciona una especie"
        onPress={handleSpecieChange}
        onChange={value => handleChangeSelect('specie', value)}
        data={species}
      />

      <InputFloatingWithIconRight
        label="Raza"
        value={pet?.race?.name}
        editable={false}
        disabled={!pet?.specie ? true : false}
        error={formik.errors.race}
        onPress={() => setModalVisibleRace(true)}>
        <RaceIcon fill="white" height={20} width={20} />
      </InputFloatingWithIconRight>

      <SheetPicker
        modalVisible={modalVisibleRace}
        closeModal={() => setModalVisibleRace(false)}
        label="Selecciona una raza"
        onPress={handleRaceChange}
        onChange={value => handleChangeSelect('race', value)}
        data={races}
      />

      <InputFloatingWithIconRight
        label="Fecha de nacimiento"
        value={pet?.birth}
        editable={false}
        error={formik.errors.birth}
        onPress={() => setModalVisibleBirth(true)}>
        <CalendarIcon fill="white" height={20} width={20} />
      </InputFloatingWithIconRight>

      {modalVisibleBirth && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={new Date(pet?.birth || new Date())}
          maximumDate={new Date()}
          minimumDate={new Date('1995-01-01')}
          onChange={(event, date) => {
            if (date) {
              setModalVisibleBirth(false)
              date.setDate(date.getDate() - 1)
              handleChange('birth', date.toISOString().split('T')[0])
            }
          }}
        />
      )}

      <InputFloatingWithIconRight
        label="Sexo"
        value={pet?.sex}
        editable={false}
        error={formik.errors.sex}
        onPress={() => setModalVisibleSex(true)}>
        <IntersexIcon fill="white" height={20} width={20} />
      </InputFloatingWithIconRight>

      <SheetSexPicker
        closeModal={() => setModalVisibleSex(false)}
        label="Selecciona un sexo"
        value={pet?.sex}
        onChange={value => handleChange('sex', value)}
        modalVisible={modalVisibleSex}
      />

      <InputFloatingWithCheckRight
        label="Castrado"
        editable={false}
        value={pet?.castrated}
        onPress={value => handleChange('castrated', value ? 'Si' : 'No')}
      />

      <InputFloatingLabel
        label="Caracteristicas"
        multiline={true}
        numberOfLines={4}
        style={{height: 100, textAlignVertical: 'top'}}
        onChange={value => handleChange('characteristic', value)}
        error={formik.errors.characteristic}
        value={pet?.characteristic}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
        <TouchableOpacity
          onPress={prevPosition}
          style={{
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            marginVertical: 20,
            padding: 10,
            backgroundColor: AppStyles.color.error,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Anterior</Text>
        </TouchableOpacity>

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
      </View>
    </ScrollView>
  )
}

export default PetDataReport

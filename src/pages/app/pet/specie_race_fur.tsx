import React, {useContext, useState, useEffect} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import SheetPicker from '@src/components/select/SheetPicker'
import AppStyles from '@src/themes/AppStyles'
import {useFormik} from 'formik'
import useAuth from '@src/hooks/useAuth'
import {SpecieRaceFurPetProfile} from '@src/schemas/schemas'
import useAddressUser from '@src/hooks/useAddressUser'
import LongButton from '@src/components/buttons/LongButton'
import {pet} from '@src/types/declare'
import AuthContext from '@src/contexts/auth/AuthContext'
import ConfigContext from '@src/contexts/config/ConfigContext'

const SpecieRaceFur = ({navigation, route}: any) => {
  const {pet, specie, race, fur} = route.params as {
    pet: pet
    specie: pet['specie']
    race: pet['race']
    fur: pet['fur']
  }

  const {AuthState} = useContext(AuthContext)
  const {ConfigState} = useContext(ConfigContext)

  const [modalSpecie, setModalSpecie] = useState(false)
  const [modalRace, setModalRace] = useState(false)
  const [modalFur, setModalFur] = useState(false)

  const [species, setSpecies] = useState(ConfigState.species)
  const [races, setRaces] = useState(ConfigState.races)
  const [furs, setFurs] = useState(ConfigState.furs)

  const [data, setData] = useState({
    id_specie: specie?.id,
    id_race: race?.id,
    id_fur: fur?.id,
  })

  const {UPDATED_PET} = useAuth()
  const formik = useFormik({
    initialValues: {
      id_specie: specie?.name,
      id_race: race?.name,
      id_fur: fur?.name,
    },
    validationSchema: SpecieRaceFurPetProfile,
    onSubmit: async values => {
      const data_ = new FormData()
      data_.append('id_specie', data.id_specie)
      data_.append('id_race', data.id_race)
      data_.append('id_fur', data.id_fur)
      data_.append('pet_id', pet.pet_id)
      data_.append('user_id', AuthState.user.user_id)

      UPDATED_PET(data_, AuthState.user.api_token)
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

  useEffect(() => {
    if (specie?.id) {
      setRaces(
        ConfigState.races.filter(e => e.id_specie === Number(specie?.id)),
      )
      setFurs(
        ConfigState.furs.filter(e =>
          e.id_specie.find(element => element === specie?.id),
        ),
      )
    }
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        flex: 1,
      }}>
      <View style={{flex: 1}}>
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
          onPress={(id: number, string: string) =>
            setData({...data, id_fur: id})
          }
          label="Pelajes"
        />
      </View>
      <LongButton
        text="Guardar"
        onPress={formik.handleSubmit}
        isValid={
          formik.isValid &&
          (formik.values.id_specie != specie?.name ||
            formik.values.id_race != race?.name ||
            formik.values.id_fur != fur?.name)
        }
      />
    </ScrollView>
  )
}

export default SpecieRaceFur

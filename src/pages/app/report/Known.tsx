import React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import Step from '@src/components/steps/Step'
import useReport from '@src/hooks/useReport'
import renderStepIndicatorknown from '@src/components/steps/StepKnown'
import PhotosReport from '@src/components/report/Photos'
import MapReport from '@src/components/report/Map'
import {Formik} from 'formik'
import {FormikFloatingLabelInput} from '@src/components'
import UserDataReport from '@src/components/report/UserData'
const labels = ['Datos del dueño', 'Datos de la mascota', 'Fotos', 'Ubicación']

const Unknown = (props: any) => {
  const {
    currentPosition,
    nextPosition,
    prevPosition,
    chooseFile,
    filePath,
    setLocation,
    location,
    requestLocationPermission,
    send,
    cantons,
    parishes,
    provinces,
    handleProvinceChange,
    handleCantonChange,
    handleParisheChange,
    furs,
    races,
    species,
  } = useReport(props.location)

  const isPaddingTop =
    currentPosition === 0 || currentPosition === 1 || currentPosition === 2
      ? true
      : false
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: isPaddingTop ? 20 : 0,
        paddingHorizontal: 20,
      }}
      contentContainerStyle={{
        height: '100%',
        width: '100%',
      }}>
      <Step
        currentPosition={currentPosition}
        labels={labels}
        renderStepIndicator={renderStepIndicatorknown}
        absolutePosition={currentPosition === 4}
      />
      {currentPosition === 0 && (
        <UserDataReport
          cantons={cantons}
          provinces={provinces}
          handleCantonChange={handleCantonChange}
          handleProvinceChange={handleProvinceChange}
          handleParisheChange={handleParisheChange}
          parishes={parishes}
          nextPosition={nextPosition}
        />
      )}
      {currentPosition === 1 && (
        <Formik
          validationSchema={null}
          initialValues={{}}
          onSubmit={values => console.log(values)}>
          {({handleSubmit, isValid}) => (
            <ScrollView
              nestedScrollEnabled
              contentContainerStyle={{paddingBottom: 10}}>
              <FormikFloatingLabelInput
                name="name"
                label="Nombre"
                autoCapitalize="words"
                autoComplete="name"
              />

              <FormikFloatingLabelInput name="specie" label="Especie" />

              <FormikFloatingLabelInput name="race" label="Raza" />
              <FormikFloatingLabelInput
                name="birth"
                label="Fecha de nacimiento"
              />
              <FormikFloatingLabelInput name="sex" label="Sexo" />
              <FormikFloatingLabelInput name="castrated" label="Castrado" />
              <FormikFloatingLabelInput
                name="characteristics"
                label="Características"
                style={{
                  height: 100,
                  textAlignVertical: 'top',
                  paddingHorizontal: 10,
                }}
                multiline={true}
                numberOfLines={10}
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
                    marginVertical: 10,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                  }}>
                  <Text style={{color: 'black'}}>Anterior</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={nextPosition}
                  style={{
                    marginVertical: 10,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                  }}>
                  <Text style={{color: 'black'}}>Siguiente</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      )}

      {currentPosition === 2 && <PhotosReport filePath={filePath} {...props} />}
      {currentPosition === 3 && (
        <MapReport
          latitude={location.latitude}
          latitudeDelta={1}
          longitude={location.longitude}
          longitudeDelta={1}
          requestLocationPermission={requestLocationPermission}
          setLocation={setLocation}
        />
      )}
    </ScrollView>
  )
}

export default Unknown

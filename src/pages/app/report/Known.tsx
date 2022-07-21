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
import PetDataReport from '@src/components/report/PetData'
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
    handleRaceChange,
    handleSpeciesChange,
  } = useReport()

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
        <PetDataReport
          species={species}
          races={races}
          nextPosition={nextPosition}
          prevPosition={prevPosition}
          handleSpecieChange={handleSpeciesChange}
          handleRaceChange={handleRaceChange}
        />
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

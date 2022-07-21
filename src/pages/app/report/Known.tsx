import React from 'react'
import {ScrollView} from 'react-native'
import Step from '@src/components/steps/Step'
import useReport from '@src/hooks/useReport'
import renderStepIndicatorknown from '@src/components/steps/StepKnown'
import PhotosReport from '@src/components/report/Photos'
import MapReport from '@src/components/report/Map'
import KnownFooter from '@src/components/footer/Known'
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
    sendKnown,
    cantons,
    parishes,
    provinces,
    handleProvinceChange,
    handleCantonChange,
    handleParisheChange,
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
        paddingHorizontal: isPaddingTop ? 20 : 0,
      }}
      contentContainerStyle={{
        height: '100%',
        width: '100%',
      }}>
      <Step
        currentPosition={currentPosition}
        labels={labels}
        renderStepIndicator={renderStepIndicatorknown}
        absolutePosition={currentPosition === 3}
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

      {currentPosition === 2 && (
        <>
          <PhotosReport filePath={filePath} routeTo="Photos_" {...props} />
          <KnownFooter
            chooseFile={chooseFile}
            nextActive={filePath.length > 0}
            currentPosition={currentPosition}
            next={nextPosition}
            prev={prevPosition}
            send={() => {}}
          />
        </>
      )}
      {currentPosition === 3 && (
        <>
          <MapReport
            latitude={location.latitude}
            latitudeDelta={1}
            longitude={location.longitude}
            longitudeDelta={1}
            currentPosition={currentPosition}
            requestLocationPermission={requestLocationPermission}
            setLocation={setLocation}
          />
          <KnownFooter
            chooseFile={chooseFile}
            nextActive={filePath.length > 0}
            currentPosition={currentPosition}
            next={nextPosition}
            prev={prevPosition}
            send={sendKnown}
          />
        </>
      )}
    </ScrollView>
  )
}

export default Unknown

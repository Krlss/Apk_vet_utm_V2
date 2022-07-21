import React from 'react'
import {ScrollView} from 'react-native'
import Step from '@src/components/steps/Step'
import useReport from '@src/hooks/useReport'
import UnknownFooter from '@src/components/footer/Unknown'
import renderStepIndicatorUnknown from '@src/components/steps/StepUnknown'
import PhotosReport from '@src/components/report/Photos'
import MapReport from '@src/components/report/Map'

const labels = ['Fotos', 'Ubicación']

const Unknown = (props: any) => {
  const {
    currentPosition,
    nextPosition,
    prevPosition,
    chooseFile,
    filePath,
    location,
    setLocation,
    requestLocationPermission,
    sendUnknown,
  } = useReport()

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: currentPosition === 0 ? 20 : 0,
      }}
      contentContainerStyle={{
        height: '100%',
        width: '100%',
      }}>
      <Step
        currentPosition={currentPosition}
        labels={labels}
        renderStepIndicator={renderStepIndicatorUnknown}
        absolutePosition={currentPosition === 1}
      />
      {currentPosition === 0 && (
        <PhotosReport filePath={filePath} routeTo="Photos" {...props} />
      )}
      {currentPosition === 1 && (
        <MapReport
          latitude={location.latitude}
          latitudeDelta={1}
          longitude={location.longitude}
          longitudeDelta={1}
          requestLocationPermission={requestLocationPermission}
          setLocation={setLocation}
        />
      )}

      <UnknownFooter
        currentPosition={currentPosition}
        chooseFile={chooseFile}
        next={nextPosition}
        prev={prevPosition}
        nextActive={filePath && filePath.length > 0}
        send={sendUnknown}
      />
    </ScrollView>
  )
}

export default Unknown

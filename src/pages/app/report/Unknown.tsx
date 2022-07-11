import React from 'react'
import {View} from 'react-native'
import Step from '@src/components/steps/Step'
import useReport from '@src/hooks/useReport'

import UnknownFooter from '@src/components/footer/Unknown'

import PhotosReport from '@src/components/report/Photos'

const labels = ['Fotos', 'Ubicación']

const Unknown = (props: any) => {
  const {currentPosition, nextPosition, prevPosition, chooseFile, filePath} =
    useReport()

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
      }}>
      <Step currentPosition={currentPosition} labels={labels} />
      {currentPosition === 0 && <PhotosReport filePath={filePath} {...props} />}
      <UnknownFooter
        currentPosition={currentPosition}
        chooseFile={chooseFile}
        next={nextPosition}
        prev={prevPosition}
      />
    </View>
  )
}

export default Unknown

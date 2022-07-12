import React from 'react'
import {customStyles} from './customStyles'
import StepIndicator from 'react-native-step-indicator'
import {View} from 'react-native'
import IconSwitch from '@src/components/icons/IconSwitch'

interface IProps {
  position: number
  stepStatus: string
}

export const getStepIndicatorIconConfig = ({position, stepStatus}: IProps) => {
  const iconConfig = {
    name: 'feed',
    active: stepStatus === 'finished' ? true : false,
  }
  switch (position) {
    case 0:
      iconConfig.name = 'photo'
      break
    case 1:
      iconConfig.name = 'map'
      break
    default:
      iconConfig.name = 'Home'
      break
  }
  return iconConfig
}

const renderStepIndicator = (params: any) => (
  <IconSwitch {...getStepIndicatorIconConfig(params)} />
)

interface StepProps {
  currentPosition: number
  labels: string[]
  absolutePosition?: boolean
}

const Step = ({currentPosition, labels, absolutePosition}: StepProps) => {
  return (
    <View
      style={{
        position: absolutePosition ? 'absolute' : 'relative',
        top: absolutePosition ? 20 : undefined,
        left: absolutePosition ? 0 : undefined,
        zIndex: absolutePosition ? 1 : undefined,
        width: '100%',
      }}>
      <StepIndicator
        stepCount={2}
        customStyles={customStyles}
        currentPosition={currentPosition}
        renderStepIndicator={renderStepIndicator}
        labels={labels}
      />
    </View>
  )
}

export default Step

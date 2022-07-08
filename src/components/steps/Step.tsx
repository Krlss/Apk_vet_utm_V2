import React from 'react'
import {customStyles} from './customStyles'
import StepIndicator from 'react-native-step-indicator'

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
}

const Step = ({currentPosition, labels}: StepProps) => {
  return (
    <StepIndicator
      stepCount={2}
      customStyles={customStyles}
      currentPosition={currentPosition}
      renderStepIndicator={renderStepIndicator}
      labels={labels}
    />
  )
}

export default Step

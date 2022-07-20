import React from 'react'
import {customStyles} from './customStyles'
import StepIndicator from 'react-native-step-indicator'
import {View} from 'react-native'
interface StepProps {
  currentPosition: number
  labels: string[]
  absolutePosition?: boolean
  renderStepIndicator?: (params: any) => JSX.Element
}

const Step = ({
  currentPosition,
  labels,
  absolutePosition,
  renderStepIndicator,
}: StepProps) => {
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
        stepCount={labels.length}
        customStyles={customStyles}
        currentPosition={currentPosition}
        renderStepIndicator={renderStepIndicator}
        labels={labels}
      />
    </View>
  )
}

export default Step

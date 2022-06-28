import {Text} from 'react-native'
import React from 'react'
import {useField} from 'formik'
import FloatingLabelInput from '@src/components/inputs/FloatingLabelInput'
import AppStyles from '@src/themes/AppStyles'

/** Formik input with validation.
 * Only need the name of the input
 * @param name
 * @param props
 *
 * @returns {*}
 * */

const formikFloatingLabelInput = ({
  name,
  ...props
}: {
  name: string
  [x: string]: any
}) => {
  const [field, meta, helpers] = useField(name)
  return (
    <>
      <FloatingLabelInput
        value={field.value}
        onChange={value => helpers.setValue(value)}
        {...props}
        error={meta.error}
      />
      {meta.error && meta.touched ? (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: AppStyles.font.size.medium,
            alignSelf: 'flex-start',
          }}>
          {meta.error}
        </Text>
      ) : null}
    </>
  )
}

export default formikFloatingLabelInput

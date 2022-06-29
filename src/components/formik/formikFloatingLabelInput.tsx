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
  label,
  ...props
}: {
  name: string
  label: string
  [x: string]: any
}) => {
  const [field, meta, helpers] = useField(name)
  return (
    <>
      <FloatingLabelInput
        label={label}
        value={field.value}
        onChange={value => helpers.setValue(value)}
        {...props}
        error={meta.error}
      />
      {meta.error ? (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: AppStyles.font.size.error,
            alignSelf: 'flex-start',
            paddingHorizontal: AppStyles.padding.medium,
          }}>
          {meta.error}
        </Text>
      ) : null}
    </>
  )
}

export default formikFloatingLabelInput

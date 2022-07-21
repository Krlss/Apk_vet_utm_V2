import React from 'react'
import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native'
import ArrowBack from '@src/assets/icon/arrow-back.svg'

import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group'

const dataCheck: {
  id: number
  text: string
  fillColor: string
  unfillColor: string
  textStyle: TextStyle
}[] = [
  {
    id: 0,
    text: 'Masculino',
    fillColor: '#00A0FF',
    unfillColor: '#77CDFF',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
  {
    id: 1,
    text: 'Feminino',
    fillColor: '#FF00FF',
    unfillColor: '#FF77FF',
    textStyle: {textDecorationLine: 'none', fontSize: 15},
  },
]

interface Props {
  modalVisible: boolean
  closeModal: (bool: boolean) => void
  label: string
  onChange: (value?: string) => void
  value?: string
}

const SheetSexPicker = ({
  modalVisible,
  closeModal,
  label,
  onChange,
  value,
}: Props) => {
  const selected = !value
    ? undefined
    : dataCheck.findIndex(item => item.text === value)

  const handleChange = (value?: string) => {
    onChange(value)
    closeModal(false)
  }
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => closeModal(false)}>
      <TouchableWithoutFeedback onPress={() => closeModal(false)}>
        <View style={{flex: 1}} />
      </TouchableWithoutFeedback>
      <SafeAreaView
        style={{
          width: '100%',
          height: 200,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          elevation: 5,
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 12,
            paddingHorizontal: 12,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => closeModal(false)}>
            <ArrowBack fill="gray" width={35} height={30} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              flex: 1,
              paddingHorizontal: 12,
              textAlign: 'center',
            }}
            numberOfLines={1}>
            {label}
          </Text>
          <TouchableOpacity onPress={() => closeModal(false)}>
            <Text style={{color: 'blue'}}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <BouncyCheckboxGroup
            data={dataCheck}
            initial={selected}
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-evenly',
            }}
            onChange={(selectedItem: ICheckboxButton) =>
              handleChange(selectedItem.text)
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  )
}
export default SheetSexPicker

import React, {useState, useEffect} from 'react'
import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native'
import {FlashList} from '@shopify/flash-list'

import ArrowBack from '@src/assets/icon/arrow-back.svg'
import Check from '@src/assets/icon/ep_select.svg'

interface Props {
  modalVisible: boolean
  closeModal: (bool: boolean) => void
  label: string
  onPress: (id: number, text: string) => void
  onChange: (text: string) => void
  data: {
    id: number
    name: string
    active?: boolean
  }[]
}

const YourComponent = ({
  modalVisible,
  closeModal,
  onPress,
  label,
  data,
  onChange,
}: Props) => {
  const [_data, setData] = useState(data)
  const [query, setQuery] = useState('')
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    if (query.length > 0) {
      const filtered = data.filter(option =>
        option.name.toLowerCase().includes(query.toLowerCase()),
      )
      setData(filtered)
    } else {
      setData(data)
    }
  }, [query, onPress])

  const handleChange = (id: number, text: string) => {
    closeModal(false)
    onPress(id, text)
    onChange(text)
  }

  return (
    <Modal
      animationType="slide"
      style={{flex: 0, width: 250, height: 100}}
      visible={modalVisible}
      onRequestClose={() => closeModal(false)}>
      <SafeAreaView style={{flex: 1}}>
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
        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: 'transparent',
              borderBottomColor: focus ? '#FFB509' : '#ddd',
              borderWidth: 1,
              paddingHorizontal: 12,
              color: 'black',
              backgroundColor: focus ? '#fff' : '#F5F7FA',
            }}
            selectionColor="#FFB509"
            placeholderTextColor="#ddd"
            onFocus={() => {
              setFocus(true)
            }}
            onBlur={() => {
              setFocus(query ? true : false)
            }}
            onChangeText={text => setQuery(text)}
            value={query}
            placeholder="Buscar..."
          />
        </View>

        <FlashList
          data={_data}
          estimatedItemSize={100}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              disabled={item.active}
              onPress={() => handleChange(item.id, item.name)}
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: 'transparent',
                borderBottomColor: '#ddd',
                borderWidth: 1,
                backgroundColor: item.active ? '#F5F7FA' : 'transparent',
              }}>
              <Text
                style={{
                  color: 'black',
                }}>
                {item.name}
              </Text>
              {item.active && <Check fill="#FFB509" width={25} height={25} />}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  )
}
export default YourComponent

import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

interface IProps {
  currentPosition: number
  chooseFile: () => void
  next?: () => void
  prev?: () => void
}

const UnknownFooter = ({currentPosition, chooseFile, next, prev}: IProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
      }}>
      {currentPosition === 0 ? (
        <>
          <TouchableOpacity
            onPress={chooseFile}
            style={{
              backgroundColor: '#FFB509',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Seleccionar fotos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={next}
            style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Siguiente</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={prev}
            style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('enviar')}
            style={{
              backgroundColor: '#FFB509',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Finalizar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default UnknownFooter
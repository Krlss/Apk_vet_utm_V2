import React, {useContext} from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import ConfigContext from '@src/contexts/config/ConfigContext'

interface IProps {
  currentPosition: number
  chooseFile: () => void
  next?: () => void
  prev?: () => void
  nextActive?: boolean
  send?: () => void
}

const UnknownFooter = ({
  currentPosition,
  chooseFile,
  next,
  prev,
  nextActive,
  send,
}: IProps) => {
  const {ConfigState} = useContext(ConfigContext)
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
      {currentPosition === 0 ? (
        <>
          <TouchableOpacity
            onPress={chooseFile}
            disabled={ConfigState.loading}
            style={{
              backgroundColor: '#FFB509',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: ConfigState.loading ? 0.5 : 1,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Seleccionar fotos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={next}
            disabled={!nextActive || ConfigState.loading}
            style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                opacity: nextActive || !ConfigState.loading ? 1 : 0.5,
              }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={prev}
            disabled={ConfigState.loading}
            style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                opacity: ConfigState.loading ? 0.5 : 1,
              }}>
              Anterior
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={send}
            disabled={ConfigState.loading}
            style={{
              backgroundColor: '#FFB509',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 10,
              opacity: ConfigState.loading ? 0.5 : 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {ConfigState.loading ? 'Enviando ' : 'Finalizar'}
            </Text>
            {ConfigState.loading && (
              <ActivityIndicator size="small" color="black" />
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default UnknownFooter

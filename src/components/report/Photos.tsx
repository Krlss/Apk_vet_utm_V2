import React, {useState} from 'react'
import ArrowBack from '@src/assets/icon/arrow-back.svg'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  View,
  StyleSheet,
} from 'react-native'
import {Results} from '@baronha/react-native-multiple-image-picker'

interface IProps extends NativeStackScreenProps<{Photos: any}> {
  filePath?: Results[]
}

const Photos = ({filePath, navigation}: IProps) => {
  return (
    <ScrollView>
      {filePath && filePath.length > 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {filePath.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                navigation.navigate('Photos', {
                  filePath: filePath,
                  index,
                })
              }}>
              <View style={{margin: 5}}>
                <Image
                  source={{uri: item.path}}
                  style={{width: 125, height: 125}}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

export default Photos

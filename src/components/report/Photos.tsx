import React from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {TouchableWithoutFeedback, ScrollView, Image, View} from 'react-native'
import {Results} from '@baronha/react-native-multiple-image-picker'
import CrossIcon from '@src/components/icons/CrossLight'
interface IProps extends NativeStackScreenProps<any> {
  filePath?: any[]
  routeTo: 'Photos' | 'Photos_' | 'PHOTOS_PET'
  deleteFile?: (index: number) => void
}

const Photos = ({filePath, navigation, routeTo, deleteFile}: IProps) => {
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
                navigation.navigate(routeTo, {
                  filePath: filePath,
                  index,
                })
              }}>
              <View style={{margin: 5}}>
                {deleteFile && (
                  <TouchableWithoutFeedback onPress={() => deleteFile(index)}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        zIndex: 1,
                      }}>
                      <CrossIcon stroke="red" width={20} height={20} />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                <Image
                  source={{uri: item.path ? item.path : item.url}}
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

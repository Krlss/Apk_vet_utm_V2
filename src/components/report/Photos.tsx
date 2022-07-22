import React from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {TouchableWithoutFeedback, ScrollView, Image, View} from 'react-native'
import {Results} from '@baronha/react-native-multiple-image-picker'
interface IProps extends NativeStackScreenProps<any> {
  filePath?: Results[]
  routeTo: 'Photos' | 'Photos_'
}

const Photos = ({filePath, navigation, routeTo}: IProps) => {
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

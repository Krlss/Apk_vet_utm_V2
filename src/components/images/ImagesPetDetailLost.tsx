import React from 'react'
import {TouchableWithoutFeedback, Image} from 'react-native'
import {image} from '@src/types/declare'
import {petLost} from '@src/types/declare'

const ImagesPetDetailLost = ({
  navigation,
  images,
  index,
  item,
  width,
  HEADER_HEIGHT_EXPANDED,
  pet,
}: {
  navigation: any
  images: image[]
  index: number
  item: image
  width: number
  HEADER_HEIGHT_EXPANDED: number
  pet: petLost
}) => {
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => {
        navigation.navigate('IMAGES', {
          filePath: images,
          index,
          pet,
        })
      }}>
      <Image
        style={{
          flex: 1,
          width,
          height: HEADER_HEIGHT_EXPANDED,
          backgroundColor: '#ddd',
        }}
        source={{uri: item.url}}
      />
    </TouchableWithoutFeedback>
  )
}

export default ImagesPetDetailLost

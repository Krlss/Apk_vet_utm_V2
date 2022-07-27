import React from 'react'
import {FlatList, Image} from 'react-native'
import {image} from '@src/types/declare'
import ImagesPetDetailLost from '@src/components/images/ImagesPetDetailLost'
import {petLost} from '@src/types/declare'

const FlatListDetailPetLost = ({
  navigation,
  images,
  width,
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  pet,
}: {
  navigation: any
  images: image[]
  width: number
  HEADER_HEIGHT_EXPANDED: number
  HEADER_HEIGHT_NARROWED: number
  pet: petLost
}) => {
  return images.length ? (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      snapToInterval={width}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      bounces={false}
      renderItem={({item, index}) => (
        <ImagesPetDetailLost
          pet={pet}
          images={images}
          index={index}
          item={item}
          width={width}
          navigation={navigation}
          key={item.id}
          HEADER_HEIGHT_EXPANDED={HEADER_HEIGHT_EXPANDED}
          HEADER_HEIGHT_NARROWED={HEADER_HEIGHT_NARROWED}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  ) : (
    <Image
      source={require('../../../assets/img/no-pictures.png')}
      style={{
        width: '100%',
        height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
      }}
    />
  )
}

export default FlatListDetailPetLost

import React from 'react'
import {FlatList, Image, View} from 'react-native'
import {image} from '@src/types/declare'
import ImagesPetDetailLost from '@src/components/images/ImagesPetDetailLost'
import {petLost} from '@src/types/declare'

const FlatListDetailPetLost = ({
  navigation,
  images,
  width,
  HEADER_HEIGHT_EXPANDED,
  pet,
}: {
  navigation: any
  images: image[]
  width: number
  HEADER_HEIGHT_EXPANDED: number
  pet: petLost
}) => {
  return images.length ? (
    <View>
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
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  ) : (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: HEADER_HEIGHT_EXPANDED,
        backgroundColor: '#ddd',
      }}>
      <Image
        source={require('../../../assets/img/no-pictures.png')}
        style={{
          width: 250,
          height: 250,
        }}
      />
    </View>
  )
}

export default FlatListDetailPetLost

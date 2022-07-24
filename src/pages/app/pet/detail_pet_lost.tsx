import React, {useRef, useState} from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import {petLost, image} from '@src/types/declare'
import usePhotos from '@src/hooks/usePhotos'
import PhotosReportsPaginator from '@src/components/paginations/photosReports'

const PetDetailLost = ({navigation, route}: any) => {
  const {pet} = route.params as {pet: petLost}
  const {
    name,
    pet_id,
    report_date,
    birth,
    castrated,
    characteristic,
    fur_name,
    images,
    race_name,
    sex,
    specie_name,
  } = pet

  const {
    ScrollX,
    currentIndex,
    height,
    width,
    slideRef,
    viewConfig,
    viewableItemsChanged,
  } = usePhotos(0)

  return (
    <View>
      {images.length > 0 ? (
        <>
          <FlatList
            data={images}
            style={{
              backgroundColor: '#ddd',
            }}
            horizontal
            pagingEnabled
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            decelerationRate="fast"
            ref={slideRef}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: ScrollX}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback
                key={item.id}
                onPress={() => {
                  navigation.navigate('IMAGES', {
                    filePath: images,
                    index,
                  })
                }}>
                <Image
                  style={{width: width, height: 400}}
                  source={{uri: item.url}}
                />
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <PhotosReportsPaginator
            data={Array(images.length).fill(0)}
            scrollX={ScrollX}
            currentIndex={currentIndex}
          />
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            paddingLeft: 8,
          }}>
          <Image
            style={{width: 400, height: 400}}
            source={require('@src/assets/img/no-pictures.png')}
          />
        </View>
      )}
    </View>
  )
}

export default PetDetailLost

import React from 'react'
import {
  View,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import ArrowBack from '@src/assets/icon/arrow-back.svg'
import AppStyles from '@src/themes/AppStyles'

import usePhotos from '@src/hooks/usePhotos'

const Photos = ({navigation, route}: any) => {
  const {filePath, index} = route.params
  const {
    currentIndex,
    scrollToActiveIndex,
    height,
    width,
    bottomRef,
    topRef,
    IMAGE_SIZE,
    SPACING,
  } = usePhotos(index)

  return (
    <Modal style={{position: 'relative'}}>
      <View style={{position: 'absolute', zIndex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{top: 10, left: 10}}>
          <ArrowBack fill={AppStyles.color.yellow} width={35} height={30} />
        </TouchableOpacity>
        <Text style={{color: 'white', top: 20, left: width / 2 - 50}}>
          {currentIndex + 1}/{filePath.length}
        </Text>
      </View>
      <FlatList
        data={filePath}
        style={{
          backgroundColor: '#000',
        }}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        ref={topRef}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width)
          scrollToActiveIndex(index)
        }}
        renderItem={({item, index}) => (
          <View style={{width, height}}>
            <Image
              source={{uri: item.path}}
              style={[StyleSheet.absoluteFill, {resizeMode: 'contain'}]}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <FlatList
        data={filePath}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={IMAGE_SIZE + SPACING}
        ref={bottomRef}
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: 15}}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
            <Image
              source={{uri: item.path}}
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                borderRadius: 12,
                marginRight: SPACING,
                borderWidth: 2,
                borderColor:
                  currentIndex === index
                    ? AppStyles.color.yellow
                    : 'transparent',
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Modal>
  )
}
export default Photos

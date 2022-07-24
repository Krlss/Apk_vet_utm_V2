import React from 'react'
import {
  View,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native'
import {Results} from '@baronha/react-native-multiple-image-picker'
import ArrowBack from '@src/assets/icon/arrow-back.svg'
import AppStyles from '@src/themes/AppStyles'
import PhotosReportsPaginator from '@src/components/paginations/photosReports'
import usePhotos from '@src/hooks/usePhotos'

const Photos = ({navigation, route}: any) => {
  const {filePath, index} = route.params as {
    filePath: Results[] | any[]
    index: number
  }
  const {
    currentIndex,
    viewableItemsChanged,
    height,
    width,
    ScrollX,
    viewConfig,
    slideRef,
  } = usePhotos(index)

  return (
    <Modal
      transparent
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{position: 'absolute', zIndex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{top: 25, left: 20}}>
          <ArrowBack fill={AppStyles.color.yellow} width={35} height={30} />
        </TouchableOpacity>
        <Text style={{color: 'white', top: 30, left: width / 2 - 40}}>
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
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ref={slideRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: ScrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        renderItem={({item, index}) => (
          <View
            style={{
              width,
              height,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.url ?? item.path}}
              style={[StyleSheet.absoluteFill, {resizeMode: 'contain'}]}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <PhotosReportsPaginator
        data={Array(filePath.length).fill(0)}
        scrollX={ScrollX}
        currentIndex={currentIndex}
      />
    </Modal>
  )
}
export default Photos

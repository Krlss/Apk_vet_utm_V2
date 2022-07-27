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
import ArrowBackIcon from '@src/components/icons/ArrowBack'
import AppStyles from '@src/themes/AppStyles'
import PhotosReportsPaginator from '@src/components/paginations/photosReports'
import usePhotos from '@src/hooks/usePhotos'
import {petLost} from '@src/types/declare'

import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler'
const Photos = ({navigation, route}: any) => {
  const {filePath, index, pet} = route.params as {
    filePath: Results[] | any[]
    index: number
    pet?: petLost
  }
  const {
    currentIndex,
    viewableItemsChanged,
    height,
    width,
    ScrollX,
    viewConfig,
    slideRef,
    onZoomEvent,
    onZoomStateChange,
    scale,
  } = usePhotos(index)

  return (
    <Modal
      transparent
      animationType="fade"
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GestureHandlerRootView>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            top: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 5,
              marginLeft: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 20,
            }}>
            <ArrowBackIcon fill="white" width={20} height={20} />
          </TouchableOpacity>
          <Text style={{color: 'white', left: width / 2 - 65}}>
            {currentIndex + 1}/{filePath.length}
          </Text>
        </View>
        {pet && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: '100%',
              top: 60,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
            <Text style={{color: 'white', textTransform: 'uppercase'}}>
              {pet?.name}
            </Text>
            <Text style={{color: 'white'}}>{pet?.pet_id}</Text>
          </View>
        )}
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
              <PinchGestureHandler
                onGestureEvent={onZoomEvent}
                onHandlerStateChange={onZoomStateChange}>
                <Animated.Image
                  source={{uri: item.url ?? item.path}}
                  style={[
                    StyleSheet.absoluteFill,
                    {resizeMode: 'contain', transform: [{scale: scale}]},
                  ]}
                />
              </PinchGestureHandler>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <PhotosReportsPaginator
          data={Array(filePath.length).fill(0)}
          scrollX={ScrollX}
          currentIndex={currentIndex}
        />
      </GestureHandlerRootView>
    </Modal>
  )
}
export default Photos

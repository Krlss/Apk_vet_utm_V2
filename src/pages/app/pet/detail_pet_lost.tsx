import React, {useRef} from 'react'
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import {petLost} from '@src/types/declare'
import usePhotos from '@src/hooks/usePhotos'
import FlatListDetailPetLost from './FlatListDetailPetLost'
import AppStyles from '@src/themes/AppStyles'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import ArrowBack from '@src/components/icons/ArrowBack'
import ImageExpandIcon from '@src/components/icons/ImageExpand'
import {getDateDiff, getDateDiffBirth} from '@src/utils/date'
import {getSex} from '@src/utils/format'

function generateTweets(limit: number) {
  return new Array(limit).fill(0).map((_, index) => {
    const repetitions = Math.floor(Math.random() * 3) + 1

    return {
      key: index.toString(),
      text: 'Lorem ipsum dolor amet '.repeat(repetitions),
      author: 'Arnaud',
      tag: 'eveningkid',
    }
  })
}

const TWEETS = generateTweets(30)

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
    report,
    user,
  } = pet

  const {
    ScrollX,
    currentIndex,
    width,
    height,
    slideRef,
    viewConfig,
    viewableItemsChanged,
  } = usePhotos(0)

  const HEADER_HEIGHT_EXPANDED = 200,
    HEADER_HEIGHT_NARROWED = 100
  const scrollY = useRef(new Animated.Value(0)).current
  console.log(report)

  return (
    <View style={{backgroundColor: AppStyles.color.bg_low_gray, flex: 1}}>
      <View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: 20,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: 20,
            width: 25,
            height: 25,
            borderRadius: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowBack fill="white" width={20} height={20} />
        </TouchableOpacity>
        {images.length > 1 ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('IMAGES', {
                filePath: images,
                index: 0,
                pet,
              })
            }}
            style={{
              marginRight: 20,
              width: 25,
              height: 25,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageExpandIcon fill="white" width={20} height={20} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: HEADER_HEIGHT_EXPANDED,
          left: 20,
          width: '100%',
          alignItems: 'flex-start',
          opacity: scrollY.interpolate({
            inputRange: [90, 110],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [90, 120],
                outputRange: [10, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: -3,
            }}>
            {name}
          </Text>

          <Text style={{color: 'white', fontSize: 13}}>{pet_id}</Text>
        </View>
      </Animated.View>

      <FlatListDetailPetLost
        pet={pet}
        width={width}
        images={images}
        navigation={navigation}
        HEADER_HEIGHT_EXPANDED={HEADER_HEIGHT_EXPANDED}
        HEADER_HEIGHT_NARROWED={HEADER_HEIGHT_NARROWED}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          position: 'absolute',
          top: HEADER_HEIGHT_NARROWED + HEADER_HEIGHT_EXPANDED - 15,
          width: '100%',
          height: '100%',
          backgroundColor: AppStyles.color.bg_low_gray,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          zIndex: 1,
          padding: 20,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        <View>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 10,
                textTransform: 'capitalize',
              },
            ]}>
            {name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 15,
                  color: 'gray',
                },
              ]}>
              {pet_id}
            </Text>

            {report_date ? (
              <Text
                style={[
                  styles.text,
                  {marginBottom: 15, fontSize: 15, color: 'gray'},
                ]}>
                {getDateDiff(report_date)}
              </Text>
            ) : null}
          </View>

          {specie_name || race_name ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'normal',
                  }}>
                  {specie_name}
                </Text>
                {specie_name && race_name ? (
                  <Text style={{color: 'gray'}}>{' - '}</Text>
                ) : null}
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'normal',
                  }}>
                  {race_name}
                </Text>
              </View>
            </>
          ) : null}

          {birth || sex ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {sex ? (
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: 'normal',
                    }}>
                    {getSex(sex)}
                  </Text>
                ) : null}
                {birth && sex ? (
                  <Text style={{color: 'gray'}}>{' - '}</Text>
                ) : null}
                {birth ? (
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: 'normal',
                    }}>
                    {getDateDiffBirth(birth)}
                  </Text>
                ) : null}
              </View>
            </>
          ) : null}
          <Text
            style={{
              color: 'black',
              marginTop: 10,
              textTransform: 'capitalize',
            }}>
            {characteristic}
          </Text>
          {user ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  backgroundColor: AppStyles.color.yellow,
                  alignSelf: 'flex-start',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 20,
                  borderRadius: 50,
                  marginRight: 10,
                }}>
                {user?.name[0]}
              </Text>
              <View>
                <Text
                  numberOfLines={1}
                  style={{color: 'black', fontWeight: 'bold'}}>
                  {user?.email}
                </Text>
                <Text style={{color: 'gray'}}>Dueño</Text>
              </View>
            </View>
          ) : null}
          <View
            style={{
              height: '100%',
              width: '100%',
              marginTop: user || characteristic ? 20 : 0,
            }}>
            {report ? (
              <>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    marginBottom: 5,
                  }}>
                  Última ubicación de la mascota
                </Text>
                <MapView
                  style={{width: '100%', height: 200}}
                  initialRegion={{
                    latitude: parseFloat(report?.latitude),
                    longitude: parseFloat(report?.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker
                    draggable={false}
                    coordinate={{
                      latitude: parseFloat(report?.latitude),
                      longitude: parseFloat(report?.longitude),
                    }}
                  />
                </MapView>
              </>
            ) : null}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default PetDetailLost

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
  tweet: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
})

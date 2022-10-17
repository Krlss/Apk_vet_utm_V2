import React, {useRef} from 'react'
import {View, Text, Animated, TouchableOpacity, Image} from 'react-native'
import {petLost} from '@src/types/declare'
import usePhotos from '@src/hooks/usePhotos'
import FlatListDetailPetLost from './FlatListDetailPetLost'
import AppStyles from '@src/themes/AppStyles'
import ArrowBack from '@src/components/icons/ArrowBack'
import ImageExpandIcon from '@src/components/icons/ImageExpand'
import {getDateDiff, getDateDiffBirth} from '@src/utils/date'
import {getSex} from '@src/utils/format'
import CardsInfoPetLost from '@src/components/labels/CardsInfoPetLost'
import UserCardPetLost from '@src/components/labels/UserCardPetLost'
import PingGoogleMaps from '@src/components/icons/PingGoogleMaps'

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
    specie_image,
  } = pet

  const {width, height} = usePhotos(0)

  const HEADER_HEIGHT_EXPANDED = height / 2
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: AppStyles.color.bg_low_gray,
      }}>
      {/* Arrow back + expanded button image */}
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
            width: 35,
            height: 35,
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
              marginRight: 15,
              width: 35,
              height: 35,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageExpandIcon fill="white" width={20} height={20} />
          </TouchableOpacity>
        ) : null}
      </View>

      {report ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('MAP_PET_LOST', {pet, report})}
          style={{
            zIndex: 3,
            position: 'absolute',
            top: HEADER_HEIGHT_EXPANDED - 50,
            bottom: HEADER_HEIGHT_EXPANDED,
            right: 20,
            width: 35,
            height: 35,
            borderRadius: 20,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PingGoogleMaps width={25} height={25} />
        </TouchableOpacity>
      ) : null}

      {/* Name + petID scroll view animated */}
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',
          top: HEADER_HEIGHT_EXPANDED - 75,
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
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          position: 'absolute',
          top: HEADER_HEIGHT_EXPANDED,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: AppStyles.color.bg_low_gray,
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
        <View style={{paddingVertical: 20, flex: 1}}>
          <View style={{paddingHorizontal: 20}}>
            {/* Name pet */}
            <Text
              numberOfLines={1}
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: 'black',
              }}>
              {name}
            </Text>

            {/* ID and created report date */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                }}>
                {pet_id}
              </Text>

              {report_date ? (
                <Text style={{fontSize: 15, color: 'gray'}}>
                  {getDateDiff(report_date)}
                </Text>
              ) : null}
            </View>
          </View>

          {/* characteristic pet */}
          <View style={{paddingHorizontal: 15}}>
            {characteristic ? (
              <Text
                style={{
                  color: 'gray',
                  paddingHorizontal: 5,
                  marginBottom: 10,
                }}>
                {characteristic}
              </Text>
            ) : null}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              {specie_name ? (
                <CardsInfoPetLost label="Especie" value={specie_name}>
                  {specie_image ? (
                    <Image
                      source={{
                        uri: specie_image,
                      }}
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 5,
                      }}
                    />
                  ) : null}
                </CardsInfoPetLost>
              ) : (
                <CardsInfoPetLost label="Especie" value="Sin especificar" />
              )}
              {sex ? (
                <CardsInfoPetLost label="Sexo" value={getSex(sex)}>
                  <Image
                    source={require('@src/assets/img/sexo.png')}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 5,
                    }}
                  />
                </CardsInfoPetLost>
              ) : (
                <CardsInfoPetLost label="Sexo" value="Sin especificar" />
              )}

              {birth ? (
                <CardsInfoPetLost label="Edad" value={getDateDiffBirth(birth)}>
                  <Image
                    source={require('@src/assets/img/calendar.png')}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 5,
                    }}
                  />
                </CardsInfoPetLost>
              ) : (
                <CardsInfoPetLost label="Edad" value="Sin especificar" />
              )}
            </View>

            {race_name ? (
              <CardsInfoPetLost label="Raza" value={race_name}>
                <Image
                  source={require('@src/assets/img/breed.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                  }}
                />
              </CardsInfoPetLost>
            ) : (
              <CardsInfoPetLost label="Raza" value="Sin especificar" />
            )}
          </View>

          {user ? (
            <UserCardPetLost user={{email: user.email}} bool={true} />
          ) : (
            <UserCardPetLost user={{email: 'Sin especificar'}} bool={false} />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default PetDetailLost

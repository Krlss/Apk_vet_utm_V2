import React from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {petLost} from '@src/types/declare'
import {FlashList} from '@shopify/flash-list'
import AppStyles from '@src/themes/AppStyles'
import {getDateDiffBirth} from '@src/utils/date'
import {getSex} from '@src/utils/format'
import {nColumns} from '@src/utils/grid'

const FlatListPet = ({
  data,
  onRefresh,
  isFetching,
  onEndReached,
  navigation,
}: {
  data: petLost[]
  onRefresh: () => void
  isFetching: boolean
  onEndReached: () => void
  navigation: any
}) => {
  const {width} = useWindowDimensions()

  const renderFooter = () => {
    return isFetching && data.length ? (
      <View style={{marginVertical: 10, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={AppStyles.color.gray} />
      </View>
    ) : null
  }

  return (
    <View style={{flex: 1}}>
      <FlashList
        data={data}
        numColumns={nColumns(width)}
        contentContainerStyle={{paddingBottom: 30}}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            colors={[AppStyles.color.yellow]}
            refreshing={false}
            onRefresh={onRefresh}
          />
        }
        renderItem={({item, index}) => (
          <View
            key={item.pet_id}
            style={{
              flex: 1,
              margin: 5,
              padding: 10,
              borderRadius: 10,
              backgroundColor: AppStyles.color.bg_low_gray,
              elevation: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PET_DETAIL', {
                  pet: item,
                  index: index,
                })
              }}>
              <Image
                source={
                  item.images?.length
                    ? {uri: item.images[0].url}
                    : require('../../assets/img/photo.png')
                }
                style={{
                  width: '100%',
                  height: 200,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              />
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textTransform: 'capitalize',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    lineHeight: 15,
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  {item.pet_id}
                </Text>
                {item?.sex || item?.birth ? (
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 11,
                    }}>
                    {item?.sex ? getSex(item?.sex) : null}
                    {item?.sex && item?.birth ? <> ● </> : null}
                    {getDateDiffBirth(item?.birth ?? '')}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        )}
        estimatedItemSize={data.length}
        bounces={false}
        keyExtractor={item => item?.pet_id}
      />
    </View>
  )
}
export default FlatListPet

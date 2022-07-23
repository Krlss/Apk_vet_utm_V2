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
import {getDateDiff} from '@src/utils/date'
import {nColumns} from '@src/utils/grid'
import * as Animatable from 'react-native-animatable'

const FlatListPet = ({
  data,
  onRefresh,
  isFetching,
  onEndReached,
}: {
  data: petLost[]
  onRefresh: () => void
  isFetching: boolean
  onEndReached: () => void
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
          <Animatable.View
            style={{
              flex: 1,
            }}
            animation="zoomInRight"
            duration={1000}
            delay={index * 300}>
            <TouchableOpacity
              style={{
                margin: 5,
                padding: 15,
                backgroundColor: AppStyles.color.bg_low_gray,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.report_date ? (
                <Text
                  style={{
                    color: 'gray',
                    alignSelf: 'flex-start',
                    fontSize: 13,
                  }}>
                  {getDateDiff(item.report_date)}
                </Text>
              ) : (
                <View style={{paddingTop: 20}} />
              )}
              <Image
                source={
                  item.images?.length
                    ? {uri: item.images[0].url}
                    : require('../../assets/img/photo.png')
                }
                style={{width: 100, height: 100, marginVertical: 10}}
              />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textTransform: 'uppercase',
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
                  #{item.pet_id}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    color: 'black',
                    marginTop: 10,
                  }}>
                  {item?.race_name}
                </Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        )}
        estimatedItemSize={100}
        keyExtractor={item => item?.pet_id}
      />
    </View>
  )
}
export default FlatListPet

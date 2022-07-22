import React from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import {petLost} from '@src/types/declare'
import {FlashList} from '@shopify/flash-list'
import AppStyles from '@src/themes/AppStyles'
import {getDateDiff} from '@src/utils/date'
import {nColumns} from '@src/utils/grid'

const FlatListPet = ({
  data,
  onRefresh,
}: {
  data: petLost[]
  onRefresh: () => void
}) => {
  const {width} = useWindowDimensions()
  return (
    <View style={{flex: 1}}>
      <FlashList
        data={data}
        numColumns={nColumns(width)}
        contentContainerStyle={{paddingBottom: 30}}
        refreshControl={
          <RefreshControl
            colors={[AppStyles.color.yellow]}
            refreshing={false}
            onRefresh={onRefresh}
          />
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flex: 1,
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
                item.images
                  ? {uri: item.images[0].url}
                  : require('../../assets/img/photo.png')
              }
              style={{width: 100, height: 100, marginVertical: 10}}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
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
                style={{
                  color: 'black',
                  marginTop: 10,
                }}>
                {item?.race_name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        estimatedItemSize={100}
        keyExtractor={item => item.pet_id}
      />
    </View>
  )
}
export default FlatListPet

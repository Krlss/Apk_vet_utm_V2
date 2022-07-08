import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {specie} from '@src/types/declare'
import AppStyles from '@src/themes/AppStyles'
import {ScrollView} from 'react-native-gesture-handler'
interface Props {
  data: [specie] | undefined
  onPress: (id: number) => void
}

const HeaderSpecies = ({data, onPress}: Props) => {
  console.log(data)
  return (
    <View style={{paddingLeft: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
        Especies
      </Text>
      <ScrollView horizontal contentContainerStyle={{paddingVertical: 10}}>
        {data?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(index)}
            style={{
              marginRight: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: item.active
                ? AppStyles.color.yellow
                : AppStyles.color.bg_low_gray,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {item.uri && (
              <Image
                source={{
                  uri: item.uri,
                }}
                style={{
                  width: 35,
                  height: 35,
                }}
              />
            )}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: item.active
                  ? AppStyles.color.white
                  : AppStyles.color.black,
                marginLeft: 5,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
export default HeaderSpecies

import React, {useContext} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {specie} from '@src/types/declare'
import AppStyles from '@src/themes/AppStyles'
import {ScrollView} from 'react-native-gesture-handler'
import ConfigContext from '@src/contexts/config/ConfigContext'

interface Props {
  data: specie[] | undefined
  onPress: (id: number) => void
}

const HeaderSpecies = ({data, onPress}: Props) => {
  const {ConfigState} = useContext(ConfigContext)

  return (
    <View style={{paddingLeft: 20}}>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingTop: 10}}
        scrollEnabled={!ConfigState.loading}>
        {data?.map(item => (
          <TouchableOpacity
            key={item.id}
            disabled={ConfigState.loading}
            onPress={() => onPress(item.id)}
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
              opacity: ConfigState.loading ? 0.5 : 1,
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

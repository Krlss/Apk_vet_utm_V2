import React from 'react'

import {View, Text, FlatList, Image} from 'react-native'

const SpeciesJson = [
  {
    name: 'Perros',
    id: 1,
    url: 'https://drive.google.com/uc?id=1E6dMeO7Ok7WvOuzOLIHPk_RalWz4GZpJ&export=media',
    active: true,
  },
  {
    name: 'Gatos',
    id: 2,
    url: 'https://drive.google.com/uc?id=1OVWkFxMnGMkOWNpMFWameNh56_z18F9Q&export=media',
  },
  {
    name: 'Hamsters',
    id: 3,
    url: 'https://drive.google.com/uc?id=1XUwi8VZSA987G98K7VCgBSgbJSLlhm62&export=media',
  },
  {
    name: 'Pajaros',
    id: 4,
    url: 'https://drive.google.com/uc?id=1hYo5F6-g7Qh54c2D2wPm_qdl6ZLXGDHd&export=media',
  },
  {
    name: 'Tortugas',
    id: 5,
    url: 'https://drive.google.com/uc?id=1lV7GkyLy_VWBOpM_JeAbHPMlMXBubS5l&export=media',
  },
]

const HeaderSpecies = () => {
  return (
    <View style={{paddingLeft: 20}}>
      <Text
        style={{
          color: 'black',
          fontWeight: '500',
          fontSize: 18,
        }}>
        Especies
      </Text>
      <FlatList
        data={SpeciesJson}
        horizontal={true}
        style={{marginVertical: 10}}
        renderItem={({item, index}) => (
          <>
            {index === 0 ? (
              <Text
                numberOfLines={1}
                style={{
                  textAlignVertical: 'center',
                  color: 'black',
                  fontWeight: '500',
                  margin: 10,
                  fontSize: 18,
                  marginTop: 5,
                }}>
                Todos
              </Text>
            ) : null}
            <View
              style={{
                padding: 10,
                alignItems: 'center',
                backgroundColor: item?.active ? '#FFB509' : '#fff',
                borderRadius: 15,
                margin: 5,
                borderColor: '#E0E0E0',
                borderWidth: 1,
                maxWidth: 100,
              }}>
              <Image source={{uri: item.url}} style={{width: 75, height: 75}} />
              <Text
                numberOfLines={1}
                style={{
                  color: item?.active ? 'white' : 'black',
                  fontWeight: '500',
                  fontSize: 15,
                  marginTop: 5,
                }}>
                {item.name}
              </Text>
            </View>
          </>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}
export default HeaderSpecies

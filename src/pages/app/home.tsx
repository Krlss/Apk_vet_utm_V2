import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import useData from '@src/hooks/useData'
import HeaderSpecies from '@src/components/headers/Species'
import FlashListPet from '@src/components/home/FlashListPet'
import SearchHome from '@src/components/inputs/SearchHome'
import NotPets from '@src/components/images/NotPets'
import SpeciesHomeSkeleton from '@src/components/skeleton/SpeciesHome'
import LabelHomeSkeleton from '@src/components/skeleton/LabelHome'
import CardLostPetSkeleton from '@src/components/skeleton/CardLostPets'
import {formatNumber} from '@src/utils/format'

const Home = () => {
  const {
    species,
    pressSpecie,
    pets,
    query,
    setQuery,
    loading,
    data,
    nRefresh,
    setNRefresh,
  } = useData()

  return (
    <ScrollView contentContainerStyle={{backgroundColor: '#fff', flex: 1}}>
      <SearchHome
        value={query}
        onChangeText={(value: string) => setQuery(value)}
        cleanValue={() => setQuery('')}
      />

      {loading ? (
        <SpeciesHomeSkeleton />
      ) : (
        <HeaderSpecies data={species} onPress={pressSpecie} />
      )}

      {pets.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 20,
              marginVertical: 10,
            }}>
            Mascotas perdidas
          </Text>
          <Text style={{fontSize: 14, color: 'gray', marginLeft: 5}}>
            [{formatNumber(data.length)}]
          </Text>
        </View>
      ) : loading ? (
        <LabelHomeSkeleton />
      ) : null}

      <ScrollView contentContainerStyle={{paddingHorizontal: 15, flex: 1}}>
        {pets.length ? (
          <FlashListPet
            data={pets}
            onRefresh={() => setNRefresh(nRefresh + 1)}
          />
        ) : loading ? (
          <CardLostPetSkeleton />
        ) : (
          <NotPets />
        )}
      </ScrollView>
    </ScrollView>
  )
}

export default Home

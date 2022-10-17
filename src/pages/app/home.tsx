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

const Home = (props: any) => {
  const {
    species,
    pressSpecie,
    query,
    setQuery,
    loading,
    data,
    nRefresh,
    setNRefresh,
    isFetching,
    nextLink,
    totalData,
    getMoreData,
    search,
    pressSearch,
  } = useData()

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      {data.length > 0 ? (
        <SearchHome
          value={query}
          onPressSearch={search}
          onChangeText={(value: string) => {
            if (!value && pressSearch) setNRefresh(nRefresh + 1)
            setQuery(value)
          }}
          cleanValue={() => {
            if (pressSearch) setNRefresh(nRefresh + 1)
            setQuery('')
          }}
        />
      ) : null}

      {loading && isFetching ? (
        <SpeciesHomeSkeleton />
      ) : (
        <HeaderSpecies data={species} onPress={pressSpecie} />
      )}

      {data.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 20,
            }}>
            Mascotas perdidas
          </Text>
          {totalData || data.length ? (
            <Text style={{fontSize: 14, color: 'gray', marginLeft: 5}}>
              [{formatNumber(totalData || data.length)}]
            </Text>
          ) : null}
        </View>
      ) : loading || isFetching ? (
        <LabelHomeSkeleton />
      ) : null}

      <ScrollView contentContainerStyle={{paddingHorizontal: 15, flex: 1}}>
        {data.length ? (
          <FlashListPet
            data={data}
            isFetching={isFetching}
            onEndReached={() => {
              nextLink && getMoreData()
            }}
            onRefresh={() => setNRefresh(nRefresh + 1)}
            {...props}
          />
        ) : loading || isFetching ? (
          <CardLostPetSkeleton />
        ) : (
          <NotPets />
        )}
      </ScrollView>
    </ScrollView>
  )
}

export default Home

import React, {useContext, useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import AuthContext from '@src/contexts/auth/AuthContext'
import NotPets from '@src/components/images/NotPets'
const PetsUser = ({navigation, route}: any) => {
  const {AuthState} = useContext(AuthContext)
  const {pets} = AuthState.user
  const [focus, setFocus] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState(pets)

  useEffect(() => {
    if (query.length > 0 && pets) {
      const filtered = pets.filter(
        option =>
          option.name
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          option.specie?.name
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          option.pet_id
            ?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()),
      )
      setSearchResult(filtered)
    } else {
      setSearchResult(pets)
    }
  }, [query])

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'transparent',
          borderBottomColor: focus ? '#FFB509' : '#ddd',
          borderWidth: 1,
          paddingHorizontal: 12,
          color: 'black',
          backgroundColor: focus ? '#fff' : '#F5F7FA',
        }}
        selectionColor="#FFB509"
        placeholderTextColor="#ddd"
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(query ? true : false)
        }}
        onChangeText={text => setQuery(text)}
        value={query}
        placeholder="Buscar..."
      />
      {pets && pets.length > 0 ? (
        <FlashList
          estimatedItemSize={50}
          data={searchResult}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PET_PROFILE', {
                  pet: item,
                })
              }
              key={item.pet_id}
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: 'transparent',
                borderBottomColor: '#ddd',
                borderWidth: 1,
                backgroundColor: 'transparent',
                flex: 1,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  {item.pet_id}
                </Text>
              </View>
              <Text
                style={{
                  color: 'black',
                }}>
                {item.specie?.name ?? 'Sin especificar'}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <NotPets />
      )}
    </View>
  )
}

export default PetsUser

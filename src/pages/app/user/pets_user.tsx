import React, {useContext, useState, useEffect} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import AuthContext from '@src/contexts/auth/AuthContext'
import NotPets from '@src/components/images/NotPets'
import AppStyles from '@src/themes/AppStyles'
import useAuth from '@src/hooks/useAuth'

const PetsUser = ({navigation, route}: any) => {
  const {AuthState} = useContext(AuthContext)
  const {pets} = AuthState.user
  const [focus, setFocus] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState(pets)
  const {UPDATED_PET} = useAuth()

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
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppStyles.color.bg_low_gray}}>
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
              onLongPress={() => {
                Alert.alert(
                  'Eliminar',
                  '¿Desea eliminar este animal?\n' +
                    'Nombre: ' +
                    item.name +
                    '\n' +
                    'Identificación: ' +
                    item.pet_id,
                  [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                      text: 'Eliminar',
                      onPress: () => {
                        const data = new FormData()
                        data.append('pet_id', item.pet_id)
                        data.append('user_id', AuthState.user.user_id)
                        data.append('new_user_id', null)
                        UPDATED_PET(data, AuthState.user.api_token)
                          .then((res: any) => {
                            if (res.type === 'success') {
                              navigation.navigate('USER_PROFILE')
                            }
                          })
                          .catch((err: any) => {
                            console.log(err)
                          })
                      },
                    },
                  ],
                )
              }}
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
    </SafeAreaView>
  )
}

export default PetsUser

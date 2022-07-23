import React, {useContext} from 'react'
import {View, TouchableOpacity, TextInput, Text} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import SearchIcon from '../icons/Search'
import CrossLightIcon from '../icons/CrossLight'
import ConfigContext from '@src/contexts/config/ConfigContext'

interface Props {
  onChangeText?: (value: string) => void
  onPressSearch: () => void
  value?: string
  cleanValue?: () => void
}

const SearchHome = ({
  value,
  onChangeText,
  onPressSearch,
  cleanValue,
}: Props) => {
  const {ConfigState} = useContext(ConfigContext)

  return (
    <View style={{paddingHorizontal: 20, marginBottom: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: AppStyles.color.bg_low_gray,
          borderRadius: 10,
          borderColor: AppStyles.color.low_gray,
          borderWidth: 1,
          paddingHorizontal: 10,
        }}>
        <SearchIcon fill={AppStyles.color.gray} width={20} height={20} />
        <TextInput
          selectionColor={AppStyles.color.yellow}
          placeholder="Busca una mascota perdida"
          placeholderTextColor={AppStyles.color.gray}
          onChangeText={onChangeText}
          editable={!ConfigState.loading}
          value={value}
          style={{
            flex: 1,
            height: 40,
            paddingHorizontal: 10,
            backgroundColor: AppStyles.color.bg_low_gray,
            color: 'black',
          }}
        />
        {value ? (
          <TouchableOpacity
            disabled={ConfigState.loading}
            onPress={cleanValue}
            style={{
              marginRight: 10,
              paddingVertical: 5,
            }}>
            <CrossLightIcon
              stroke={AppStyles.color.gray}
              fill={AppStyles.color.black}
              width={25}
              height={25}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          disabled={!value || ConfigState.loading}
          style={{paddingVertical: 10}}
          onPress={onPressSearch}>
          <Text
            style={{
              color: 'black',
              opacity: value ? 1 : 0.5,
              fontWeight: value ? 'bold' : 'normal',
            }}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchHome

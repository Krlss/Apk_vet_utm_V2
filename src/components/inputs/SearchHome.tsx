import React from 'react'
import {View, TouchableOpacity, TextInput} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import SearchIcon from '../icons/Search'
import FilterIcon from '../icons/filter'
import CrossLightIcon from '../icons/CrossLight'

interface Props {
  onChangeText?: (value: string) => void
  onPressFilter?: () => void
  value?: string
  cleanValue?: () => void
}

const SearchHome = ({
  value,
  onChangeText,
  onPressFilter,
  cleanValue,
}: Props) => {
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
          placeholder="Buscar"
          placeholderTextColor={AppStyles.color.gray}
          onChangeText={onChangeText}
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
          <TouchableOpacity onPress={cleanValue} style={{marginRight: 10}}>
            <CrossLightIcon
              stroke={AppStyles.color.gray}
              fill={AppStyles.color.black}
              width={25}
              height={25}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={onPressFilter}>
          <FilterIcon fill={AppStyles.color.black} width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchHome

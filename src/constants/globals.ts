import { TextStyle } from 'react-native'

export const api_url_local = 'http://192.168.100.101:8000/api/'
export const api_url_production = 'http://192.168.100.101:8000/api/'
export const api_url_default = 'http://192.168.100.101:8000/api/'

export const SEX_CHECK: {
    id: number
    text: string
    value: string
    fillColor: string
    unfillColor: string
    textStyle: TextStyle
}[] = [
        {
            id: 0,
            text: 'Masculino',
            value: 'M',
            fillColor: '#00A0FF',
            unfillColor: '#77CDFF',
            textStyle: { textDecorationLine: 'none', fontSize: 15 },
        },
        {
            id: 1,
            text: 'Feminino',
            value: 'F',
            fillColor: '#FF00FF',
            unfillColor: '#FF77FF',
            textStyle: { textDecorationLine: 'none', fontSize: 15 },
        },
    ]

export const LOST_CHECK: {
    id: number
    text: string
    value: boolean
    fillColor: string
    unfillColor: string
    textStyle: TextStyle
}[] = [
        {
            id: 0,
            text: 'Si',
            value: true,
            fillColor: '#FF3838',
            unfillColor: '#FF8282',
            textStyle: { textDecorationLine: 'none', fontSize: 15 },
        },
        {
            id: 1,
            text: 'No',
            value: false,
            fillColor: '#5BD321',
            unfillColor: '#8BE65F',
            textStyle: { textDecorationLine: 'none', fontSize: 15 },
        },
    ]

export const CASTRATED_CHECK: {
    id: number
    text: string
    value: boolean
    fillColor: string
    unfillColor: string
    textStyle: TextStyle
}[] = [
        {
            id: 0,
            text: 'Si',
            value: true,
            fillColor: '#5BD321',
            unfillColor: '#8BE65F',
            textStyle: { textDecorationLine: 'none', fontSize: 15 },
        },
        {
            id: 1,
            text: 'No',
            value: false,
            fillColor: '#FF3838',
            unfillColor: '#FF8282',
            textStyle: { textDecorationLine: 'none', fontSize: 15 },
        },
    ]
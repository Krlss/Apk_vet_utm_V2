import { KeyboardStatic } from 'react-native';
import { boolean } from 'yup';

export type justifyContentType = 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center' | 'space-evenly' | undefined;

export interface props {
    [key: string]: any;
}

export type KeyboardType = KeyboardStatic;

export interface ConfigContextType {
    keyboardStatus: boolean;
    Keyboard: KeyboardType;
    loading: boolean;
    provinces: provinces_select[],
    cantons: cantons_select[]
    parishes: parishes_select[],
    species: species_select[],
    races: races_select[]
    furs: furs_select[]
    headerShown: boolean
}

export interface ReportContextType {
    user: user | undefined,
    pet: pet | undefined,
    location: location,
    images: images[] | undefined
}

export interface images {
    uri: string,
    name: string,
    type: string
}
export interface location {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

export interface provinces_select {
    id: number;
    name: string;
    active?: boolean
}

export interface cantons_select {
    id: number;
    name: string;
    id_province: number;
    active?: boolean
}

export interface parishes_select {
    id: number;
    name: string;
    id_canton: number;
    active?: boolean
}

export interface species_select {
    id: number;
    name: string;
    active?: boolean
}

export interface races_select {
    id: number,
    name: string,
    id_specie?: number
    active?: boolean
}

export interface furs_select {
    id: number,
    name: string,
    id_specie: number[]
    active?: boolean
}

export interface AuthContextType {
    user: user
}

export interface Response {
    [key: string]: any;
}

export type AuthStackProps = {
    LOGIN,
    REGISTER,
    HOME_DRAWER,
    LOADING
}

export type HomeStackProps = {
    HOME,
    PET_DETAIL,
    IMAGES
    MAP_PET_LOST
}

export type ProfileUserStackProps = {
    USER_PROFILE,
    NAME_USER,
    EMAIL_USER,
    PHONE_USER,
    PASSWORD_USER,
    ADDRESS_USER,
    ADD_NEW_PET,
    PetProfileStack,
}

export type ProfilePetStackProps = {
    PETS_USER,
    PET_PROFILE,
    NAME_PET,
    SPECIE_RACE_FUR_PET,
    BIRTH_PET,
    SEX_PET,
    CASTRATED_PET,
    LOST_PET,
    PHOTOS_PET,
    CHARACTERISTIC_PET
}

export type HomeDrawerProps = {
    HOME_STACK,
    STACK_USER_PROFILE,
    REPORT,
    PROFILE,
    MAP,
    LOGOUT
}

export type HomeStackProps = {
    HOME: undefined,
}

export type fetchState = true | false;
export interface LAuth {
    email: string;
    password: string;
}

export interface ServiceRAuth extends LAuth {
    user_id: string;
    fullname: string;
    phone: string;
}
export interface RAuth extends LAuth {
    user_id: string,
    name: string,
    last_name1: string,
    last_name2: string,
    phone: string
}

export interface user {
    user_id?: string,
    profile_photo_path?: string,
    name?: string,
    last_name1?: string,
    last_name2?: string,
    fullname?: string,
    email?: string,
    id_parish?: number,
    id_canton?: number,
    id_province?: number,
    phone?: string,
    email_verified_at?: string,
    api_token?: string,
    main_street?: string,
    street_1_sec?: string,
    street_2_sec?: string,
    address_ref?: string,
    pets?: pet[],
    canton?: canton,
    province?: province,
    parish?: parish,
}

export interface pet {
    pet_id?: string,
    name?: string,
    birth?: string,
    sex?: string,
    castrated?: boolean,
    lost?: false,
    n_lost?: number,
    published?: boolean,
    id_pet_pather?: string,
    id_pet_mother?: string,
    specie?: basic,
    race?: race
    fur?: basic,
    user_id?: string,
    characteristic?: string
    images?: image[]
}

export interface petLost {
    pet_id: string,
    name: string,
    birth?: string,
    sex?: string,
    castrated?: boolean,
    lost?: boolean,
    n_lost?: number,
    published?: boolean,
    id_pet_pather?: string,
    id_pet_mother?: string,
    id_specie?: number
    id_race?: number
    id_fur?: number
    specie_name?: string,
    race_name?: string
    fur_name?: string,
    user_id?: string,
    characteristic?: string
    images: image[]
    report?: report
    report_date: string
    specie_image?: null
    user?: user
}

export interface report {
    id: number
    latitude: string
    longitude: string
    active: boolean
    pet_id: string
    user_id?: string
    created_at?: string
    updated_at?: string
}


export interface specie {
    id: number,
    name: string,
    active?: boolean,
    uri?: string,
    pets?: [pet]
}

export interface basic {
    id: number,
    name: string
}

export interface race extends basic {
    id_specie?: number,
}

export interface province extends basic {
    letter: string;
}

export interface canton extends basic {
    id_province: number | undefined;
}

export interface parish extends basic {
    id_canton: number | undefined;
}

export type ConfigActionType = | { type: "SET_KEYBOARD_STATUS"; payload: boolean } | { type: "SET_KEYBOARD"; payload: KeyboardType } | { type: "SET_LOADING"; payload: boolean } | { type: "SET_HEADER_SHOWN"; payload: boolean } | typeof SELECTS
export type ReportActionType = | { type: "SET_USER"; payload: user | undefined } | { type: "SET_PET"; payload: pet | undefined } | { type: "SET_LOCATION"; payload: location }
export interface IconProps {
    width?: number;
    height?: number;
    fill?: string;
    active?: boolean;
    stroke?: string;
}

export type DrawerContentProps = DrawerContentComponentProps & {
    selectedTab: string
    setSelectedTab: (selectedTab: string) => void
}

export interface StorageAuth {
    user_id: string;
    api_token: string;
    profile_photo_path?: string,
    name: string,
    last_name1?: string,
    last_name2?: string,
}
export interface image {
    id: number,
    id_image: string,
    url: string,
    name: string,
    external_id: string
}

export interface reportAll {
    id: number,
    latitude: string,
    longitude: string,
    pet: {
        pet_id: string,
        name: string,
        specie?: {
            name: string
            image?: {
                url: string
            }
        }
    }
}
import { useState, useContext } from 'react';
import MultipleImagePicker, {
    Results,
} from '@baronha/react-native-multiple-image-picker'
import { options } from '@src/constants/multiple-image-picker'
import { ReportUnknown } from '@src/services/report'
import AuthContext from '@src/contexts/auth/AuthContext';
import ConfigContext from '@src/contexts/config/ConfigContext';
import ReportContext from '@src/contexts/report/ReportContext';
import { getDataFromStatus } from '@src/utils/utils'

import { races_select, furs_select, cantons_select, species_select, parishes_select, provinces_select } from '@src/types/declare'


const useReport = () => {
    const { ReportState, setImages, setPet, setUser, setLocation, requestLocationPermission } = useContext(ReportContext);
    const { user, location, pet } = ReportState
    const [currentPosition, setCurrentPosition] = useState(0)
    const [filePath, setFilePath] = useState<Results[]>([])

    const { AuthState } = useContext(AuthContext);

    const { KeyboardDismiss, toggleLoading, ConfigState } = useContext(ConfigContext)
    const chooseFile = async () => {
        const response = await MultipleImagePicker.openPicker({ ...options, selectedAssets: filePath })
        if (response) {
            setFilePath(response)
        } else {
            setFilePath([])
        }
    }

    const [provinces, setProvinces] = useState<provinces_select[]>(ConfigState.provinces)
    const [cantons, setCantons] = useState<cantons_select[]>(ConfigState.cantons)
    const [parishes, setParishes] = useState<parishes_select[]>(ConfigState.parishes)
    const [species, setSpecies] = useState<species_select[]>(ConfigState.species)
    const [races, setRaces] = useState<races_select[]>(ConfigState.races)
    const [furs, setFurs] = useState<furs_select[]>(ConfigState.furs)

    const nextPosition = () => {
        setCurrentPosition(currentPosition + 1)
    }

    const prevPosition = () => {
        setCurrentPosition(currentPosition - 1)
    }

    const send = async () => {
        KeyboardDismiss() // Hide keyboard
        toggleLoading(true)
        const data = new FormData()
        filePath.forEach((item) => {
            data.append('images[]', {
                uri: item.path,
                name: item.fileName,
                type: 'image/jpeg',
            })
        })
        data.append('location', JSON.stringify(location))
        data.append('user_id', AuthState.user.user_id)
        const res = await ReportUnknown(data)
        toggleLoading(false)
        if (res.status === 200) {
            getDataFromStatus(res)
            resetData()
        }
    }

    const handleProvinceChange = (id: number, text: string) => {

        const new_provinces = provinces.map(item => {
            item.active = false;
            if (item.id === id) {
                return { ...item, active: true }
            } else
                return item
        })

        setProvinces(new_provinces)

        setUser({ ...user, province: { id, name: text, letter: '' }, canton: undefined, parish: undefined })

        const cantons_ = ConfigState.cantons.filter(item => item.id_province === id)
        setCantons(cantons_)
        setParishes([])
    }

    const handleCantonChange = (id: number, text: string) => {

        const new_cantons = cantons.map(item => {
            item.active = false;
            if (item.id === id) {
                return { ...item, active: true }
            } else
                return item
        })

        setCantons(new_cantons)

        setUser({ ...user, canton: { id, id_province: undefined, name: text }, parish: undefined })

        const parishes_ = ConfigState.parishes.filter(item => item.id_canton === id)
        setParishes(parishes_)
    }

    const handleParisheChange = (id: number, text: string) => {

        const new_parishs = parishes.map(item => {
            item.active = false;
            if (item.id === id) {
                return { ...item, active: true }
            } else
                return item
        })

        setUser({ ...user, parish: { id, id_canton: undefined, name: text } })
        setParishes(new_parishs)
    }

    const handleSpeciesChange = (id: number, text: string) => {

        const new_species = species.map(item => {
            item.active = false;
            if (item.id === id) {
                return { ...item, active: true }
            } else
                return item
        })

        setSpecies(new_species)

        setPet({ ...pet, specie: { id, name: text }, race: undefined })
        const races_ = ConfigState.races.filter(item => item.id_specie === id)
        setRaces(races_)
    }

    const handleRaceChange = (id: number, text: string) => {

        const new_races = races.map(item => {
            item.active = false;
            if (item.id === id) {
                return { ...item, active: true }
            } else
                return item
        })

        setRaces(new_races)

        setPet({ ...pet, race: { id, name: text } })

    }

    const resetData = () => {
        setFilePath([])
        requestLocationPermission()
        setCurrentPosition(0)
    }

    return {
        currentPosition, filePath,
        nextPosition,
        prevPosition,
        chooseFile,
        setFilePath,
        location,
        setLocation,
        requestLocationPermission,
        send,
        provinces,
        cantons,
        parishes,
        species,
        races,
        furs,
        handleProvinceChange,
        handleCantonChange,
        handleParisheChange,
        handleSpeciesChange,
        handleRaceChange
    }
}

export default useReport;

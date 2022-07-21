import { useState, useContext } from 'react';
import MultipleImagePicker, {
    Results,
} from '@baronha/react-native-multiple-image-picker'
import { options } from '@src/constants/multiple-image-picker'
import { ReportUnknown, ReportKnown } from '@src/services/report'
import AuthContext from '@src/contexts/auth/AuthContext';
import ConfigContext from '@src/contexts/config/ConfigContext';
import ReportContext from '@src/contexts/report/ReportContext';
import { getDataFromStatus } from '@src/utils/utils'
import { separateFullname } from '@src/utils/utils'
import { races_select, cantons_select, species_select, parishes_select, provinces_select } from '@src/types/declare'


const useReport = () => {
    const { ReportState, setPet, setUser, setLocation, requestLocationPermission } = useContext(ReportContext);
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

    const nextPosition = () => {
        setCurrentPosition(currentPosition + 1)
    }

    const prevPosition = () => {
        setCurrentPosition(currentPosition - 1)
    }

    const sendUnknown = async () => {
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
            resetDataUnknown()
        } else {
            getDataFromStatus(res)
        }
    }

    const sendKnown = async () => {
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
        const [name, last_name1, last_name2] = separateFullname(user?.fullname ?? '')
        const new_user = {
            ...user,
            name,
            last_name1,
            last_name2,
            responsable: AuthState?.user?.user_id ?? user?.user_id,
        }
        data.append('user', JSON.stringify(new_user))
        data.append('pet', JSON.stringify(pet))
        const res = await ReportKnown(data)
        toggleLoading(false)
        if (res.status === 200) {
            getDataFromStatus(res)
            resetDataKnown()
        } else {
            getDataFromStatus(res)
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

    const resetDataUnknown = () => {
        setFilePath([])
        requestLocationPermission()
        setCurrentPosition(0)
    }

    const resetDataKnown = () => {
        setFilePath([])
        requestLocationPermission()
        setCurrentPosition(0)
        setUser(undefined)
        setPet(undefined)
        setProvinces(ConfigState.provinces)
        setCantons(ConfigState.cantons)
        setParishes(ConfigState.parishes)
        setSpecies(ConfigState.species)
        setRaces(ConfigState.races)
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
        sendUnknown,
        provinces,
        cantons,
        parishes,
        species,
        races,
        handleProvinceChange,
        handleCantonChange,
        handleParisheChange,
        handleSpeciesChange,
        handleRaceChange,
        sendKnown
    }
}

export default useReport;

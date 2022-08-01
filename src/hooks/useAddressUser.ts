import { useState, useEffect, useContext } from 'react';
import ConfigContext from '@src/contexts/config/ConfigContext';
import AuthContext from '@src/contexts/auth/AuthContext';
import { provinces_select, cantons_select, parishes_select } from '@src/types/declare'

const useAddressUser = () => {
    const { ConfigState } = useContext(ConfigContext)
    const [provinces, setProvinces] = useState<provinces_select[]>(
        ConfigState.provinces,
    )
    const [cantons, setCantons] = useState<cantons_select[]>(ConfigState.cantons)
    const [parishes, setParishes] = useState<parishes_select[]>(
        ConfigState.parishes,
    )
    const [modalProvince, setModalProvince] = useState(false)
    const [modalCanton, setModalCanton] = useState(false)
    const [modalParish, setModalParish] = useState(false)
    const { AuthState } = useContext(AuthContext)
    const [data, setData] = useState<{
        id_province: number | undefined
        id_canton: number | undefined
        id_parish: number | undefined
    }>({
        id_province: AuthState.user.id_province,
        id_canton: AuthState.user.id_canton,
        id_parish: AuthState.user.id_parish,
    })

    const handleChangeProvince = (id: number, text: string) => {
        setData({ ...data, id_province: id })
        setCantons(ConfigState.cantons.filter(canton => canton.id_province === id))
    }

    const handleChangeCanton = (id: number, text: string) => {
        setData({ ...data, id_canton: id })
        setParishes(ConfigState.parishes.filter(parish => parish.id_canton === id))
    }

    const handleChangeParish = (id: number, text: string) => {
        setData({ ...data, id_parish: id })
        setParishes(
            ConfigState.parishes.map(item => {
                if (item.id === id) {
                    return { ...item, active: true }
                }
                return item
            }),
        )
    }

    useEffect(() => {
        if (data.id_province) {
            setCantons(
                ConfigState.cantons.filter(
                    canton => canton.id_province === data.id_province,
                ),
            )
        }
        if (data.id_canton) {
            setParishes(
                ConfigState.parishes.filter(
                    parish => parish.id_canton === data.id_canton,
                ),
            )
        }
    }, [data])

    return {
        provinces,
        cantons,
        parishes,
        modalProvince,
        modalCanton,
        modalParish,
        data,
        handleChangeProvince,
        handleChangeCanton,
        handleChangeParish,
        setModalProvince,
        setModalCanton,
        setModalParish,
        AuthState
    }
}

export default useAddressUser
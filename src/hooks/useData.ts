import { useState, useEffect, useContext } from 'react'
import { GET_ALL_SPECIES_WITH_PETS, GET_NEXT_PAGE_PETS_LOST, GET_ALL_PETS_LOST_BY_SPECIE, GET_PETS_SEARCH } from '@src/services/lostPet'
import { specie, petLost } from '@src/types/declare'
import ConfigContext from '@src/contexts/config/ConfigContext'
const useData = () => {
    const [species, setSpecies] = useState<specie[]>([])
    const [data, setData] = useState<petLost[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [query, setQuery] = useState('')
    const [nRefresh, setNRefresh] = useState(0)
    const [nextLink, setNextLink] = useState('')
    const [totalData, setTotalData] = useState(0)
    const [pressSearch, setPressSearch] = useState(false)

    const { KeyboardDismiss, toggleLoading } = useContext(ConfigContext)

    useEffect(() => {
        setIsFetching(true)
        KeyboardDismiss()
        setQuery('')
        setLoading(true)
        setData([])
        GET_ALL_SPECIES_WITH_PETS().then(response => {
            const res = response.json()
            res.then(data => {
                const { species, pets } = data
                setSpecies(species)
                setData(pets.data)
                setNextLink(pets.next_page_url || '')
                setTotalData(pets.total || 0)
                setLoading(false)
                setIsFetching(false)
                setPressSearch(false)
                toggleLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
                setIsFetching(false)
                toggleLoading(false)
            })
        }).catch(error => {
            console.log(error)
            setLoading(false)
            setIsFetching(false)
            toggleLoading(false)
        })
    }, [nRefresh])

    const getMoreData = () => {
        KeyboardDismiss()
        setQuery('')
        setIsFetching(true)
        if (nextLink) {
            // any element specie is selected ?
            if (species.filter((e) => e?.active).length) {
                const id = species.filter((e) => e?.active)[0].id
                GET_ALL_PETS_LOST_BY_SPECIE(id).then(response => {
                    const res = response.json()
                    res.then(data_ => {
                        const { pets } = data_
                        setData([...data, ...pets.data])
                        setNextLink(pets.next_page_url || '')
                        setIsFetching(false)
                    }).catch(err => {
                        console.log(err)
                        setLoading(false)
                        setIsFetching(false)
                        toggleLoading(false)
                    })
                }).catch(error => {
                    console.log(error)
                    setLoading(false)
                    setIsFetching(false)
                    toggleLoading(false)
                })
            } else {
                GET_NEXT_PAGE_PETS_LOST(nextLink).then(response => {
                    const res = response.json()
                    res.then(data_ => {
                        const { pets } = data_
                        setData([...data, ...pets.data])
                        setNextLink(pets.next_page_url || '')
                        setIsFetching(false)
                    }).catch(err => {
                        console.log(err)
                        setLoading(false)
                        setIsFetching(false)
                        toggleLoading(false)
                    })
                }).catch(error => {
                    console.log(error)
                    setLoading(false)
                    setIsFetching(false)
                    toggleLoading(false)
                })
            }
        }
    }

    const pressSpecie = (id: number) => {
        KeyboardDismiss()
        setQuery('')
        setData([])
        KeyboardDismiss()
        toggleLoading(true)
        const newSpecie = species.filter(specie => {
            if (specie.active && specie.id === id) {
                specie.active = false
                setLoading(true)
                GET_ALL_SPECIES_WITH_PETS().then(response => {
                    const res = response.json()
                    res.then(data => {
                        const { species, pets } = data
                        setSpecies(species)
                        setData(pets.data)
                        setNextLink(pets.next_page_url || '')
                        setTotalData(pets.total || 0)
                        setLoading(false)
                        setIsFetching(false)
                        toggleLoading(false)
                    }).catch(err => {
                        console.log(err)
                        setLoading(false)
                        setIsFetching(false)
                        toggleLoading(false)
                    })
                }).catch(error => {
                    console.log(error)
                    setLoading(false)
                    setIsFetching(false)
                    toggleLoading(false)
                })
            } else {
                specie.active = false
                if (specie.id === id) {
                    specie.active = true
                    setIsFetching(true)
                    GET_ALL_PETS_LOST_BY_SPECIE(id).then(response => {
                        const res = response.json()
                        res.then(data_ => {
                            const { pets } = data_
                            setData(pets.data)
                            setNextLink(pets.next_page_url || '')
                            setTotalData(pets.total || 0)
                            setIsFetching(false)
                            toggleLoading(false)
                        }).catch(err => {
                            console.log(err)
                            setLoading(false)
                            setIsFetching(false)
                            toggleLoading(false)
                        })
                    }).catch(error => {
                        console.log(error)
                        setLoading(false)
                        setIsFetching(false)
                        toggleLoading(false)
                    })
                }
            }
            return specie
        })
        setSpecies(newSpecie)
    }

    const search = () => {
        setPressSearch(true)
        KeyboardDismiss()
        toggleLoading(true)
        setIsFetching(true)
        setData([])
        GET_PETS_SEARCH(query).then(response => {
            const res = response.json()
            res.then(data => {
                const { pets } = data
                setData(pets.data)
                setNextLink(pets.next_page_url)
                setTotalData(pets.total)
                toggleLoading(false)
                setIsFetching(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
                setIsFetching(false)
                toggleLoading(false)
            })
        }).catch(error => {
            console.log(error)
            setLoading(false)
            setIsFetching(false)
            toggleLoading(false)
        })
    }

    return {
        species,
        loading,
        query,
        data,
        nRefresh,
        isFetching,
        nextLink,
        totalData,
        pressSearch,
        getMoreData,
        pressSpecie,
        setQuery,
        setNRefresh,
        search
    }
}

export default useData

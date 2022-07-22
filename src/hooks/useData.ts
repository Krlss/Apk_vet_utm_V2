import { useState, useEffect, useContext } from 'react'
import { GET_ALL_SPECIES_WITH_PETS } from '@src/services/lostPet'
import { specie, petLost } from '@src/types/declare'
import ConfigContext from '@src/contexts/config/ConfigContext'
const useData = () => {
    const [species, setSpecies] = useState<specie[]>([])
    const [data, setData] = useState<petLost[]>([])
    const [pets, setPets] = useState<petLost[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [query, setQuery] = useState('')
    const [nRefresh, setNRefresh] = useState(0)

    const { KeyboardDismiss } = useContext(ConfigContext)

    useEffect(() => {
        KeyboardDismiss()
        setLoading(true)
        setPets([])
        setQuery('')
        GET_ALL_SPECIES_WITH_PETS().then(response => {
            const res = response.json()
            res.then(data => {
                const { species } = data
                setSpecies(species)
                setData(data.pets)
                setPets(data.pets)
                setLoading(false)
            })
        })
    }, [nRefresh])

    useEffect(() => {
        if (query) {
            const filtered = data.filter(item => {
                return item.name.toLowerCase().includes(query.toLowerCase()) || item.pet_id.toLowerCase().includes(query.toLowerCase())
            })
            setPets(filtered)
        } else {
            setPets(data)
        }
        setSpecies(species.filter(item => {
            item.active = false
            return item
        }))
    }, [query])

    const pressSpecie = (id: number) => {
        const newSpecie = species.filter(specie => {
            if (specie.active && specie.id === id) {
                specie.active = false
                setPets(data)
            } else {
                specie.active = false
                if (specie.id === id) {
                    specie.active = true
                    setPets(data.filter(pet => pet.id_specie === id))
                }
            }
            return specie
        })
        setSpecies(newSpecie)
    }
    return { species, pressSpecie, pets, loading, query, setQuery, data, setNRefresh, nRefresh }
}

export default useData

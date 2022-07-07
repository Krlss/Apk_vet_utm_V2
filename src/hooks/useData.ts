import { useState, useEffect } from 'react'
import { GET_ALL_SPECIES_WITH_PETS } from '@src/services/lostPet'
import { specie, pet } from '@src/types/declare'

const useData = () => {
    const [species, setSpecies] = useState<[specie]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [showData, setShowData] = useState<[pet]>()

    useEffect(() => {
        GET_ALL_SPECIES_WITH_PETS().then(response => {
            const res = response.json()

            res.then(data => {
                setSpecies(data.species)
            })
        })
    }, [])

    const pressSpecie = (id: number) => {
        if (species) {
            if (species[id].active) {
                species[id].active = false
                setSpecies([...species])
            } else {
                species.forEach(item => {
                    item.active = false
                })
                species[id].active = true
                setSpecies([...species])
            }
        }
    }
    return { species, pressSpecie }
}

export default useData

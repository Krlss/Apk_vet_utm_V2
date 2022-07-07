import { useState, useEffect } from 'react'
import { GET_ALL_SPECIES_WITH_PETS } from '@src/services/lostPet'
const useData = () => {
    const [data, setData] = useState<any>()

    const handleChange = (name: string, value?: string) => {
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        GET_ALL_SPECIES_WITH_PETS().then(response => {
            const res = response.json()

            res.then(data => {
                console.log(data)
                setData(data)
            })
        })
    }, [])

    return { data, handleChange }
}

export default useData

import { useState } from 'react'

const useData = () => {
    const [data, setData] = useState<any>()

    const handleChange = (name: string, value?: string) => {
        setData({ ...data, [name]: value })
    }

    return { data, handleChange }
}

export default useData

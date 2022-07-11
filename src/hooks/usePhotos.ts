import { useState, useRef, useEffect } from 'react'
import { Dimensions, FlatList } from 'react-native'

const usePhotos = (index: number) => {
    const { width, height } = Dimensions.get('screen')
    const IMAGE_SIZE = 80
    const SPACING = 10

    const topRef = useRef<FlatList>(null)
    const bottomRef = useRef<FlatList>(null)

    const [currentIndex, setCurrentIndex] = useState(index)

    const scrollToActiveIndex = (index: number) => {
        setCurrentIndex(index)
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true,
        })
        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            bottomRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true,
            })
        } else {
            bottomRef?.current?.scrollToOffset({
                offset: 0,
                animated: true,
            })
        }
    }

    useEffect(() => {
        scrollToActiveIndex(index)
    }, [])

    return {
        currentIndex,
        scrollToActiveIndex,
        width,
        height,
        topRef,
        bottomRef,
        IMAGE_SIZE,
        SPACING,
    }
}

export default usePhotos
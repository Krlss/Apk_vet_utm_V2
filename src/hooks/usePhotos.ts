import { useState, useRef, useEffect } from 'react'
import { Dimensions, Animated, FlatList } from 'react-native'
import { State } from 'react-native-gesture-handler'
const usePhotos = (index: number) => {
    const { width, height } = Dimensions.get('window')

    const ScrollX = useRef(new Animated.Value(0)).current
    const slideRef = useRef<FlatList>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const scale = new Animated.Value(1)

    const onZoomEvent = Animated.event(
        [{
            nativeEvent: { scale: scale }
        }], { useNativeDriver: true })

    const onZoomStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    }

    const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
        setCurrentIndex(viewableItems[0]?.index ?? 0)
    }).current

    useEffect(() => {
        setCurrentIndex(index)
        slideRef.current?.scrollToOffset({
            animated: true,
            offset: index * width
        })
    }, [])

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    return {
        currentIndex,
        width,
        height,
        ScrollX,
        viewableItemsChanged,
        viewConfig,
        slideRef,
        scale,
        onZoomEvent,
        onZoomStateChange
    }
}

export default usePhotos
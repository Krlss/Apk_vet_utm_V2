import { useEffect, useContext } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import ConfigContext from '@src/contexts/config/ConfigContext'
import { duration } from '@src/constants/animations';

const useLogo = () => {

    const scale = useSharedValue(85);
    const { ConfigState } = useContext(ConfigContext);

    useEffect(() => {
        if (ConfigState.keyboardStatus) {
            scale.value = withTiming(0, { duration });
        } else {
            scale.value = withTiming(85, { duration });
        }
    }, [ConfigState.keyboardStatus]);

    const animatedScale = useAnimatedStyle(() => {
        return {
            width: scale.value,
            height: scale.value
        };
    })

    return { animatedScale, scale };

}

export default useLogo
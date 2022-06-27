import { useEffect, useContext } from 'react';
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import ConfigContext from '@src/contexts/config/ConfigContext'


const useLogo = () => {

    const scale = useSharedValue(0);

    const { ConfigState } = useContext(ConfigContext);

    useEffect(() => {
        if (ConfigState.keyboardStatus) {
            scale.value = withSpring(0, { stiffness: 300, damping: 30 });
        } else {
            scale.value = withSpring(125);
        }
    }, [ConfigState.keyboardStatus]);

    const animatedScale = useAnimatedStyle(() => {
        return {
            width: scale.value,
            height: scale.value,
        };
    })

    return { animatedScale, scale };

}

export default useLogo
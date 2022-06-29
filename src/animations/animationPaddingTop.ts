import { useEffect, useContext } from "react";
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import ConfigContext from '@src/contexts/config/ConfigContext'
import { duration } from '@src/constants/animations';

const animationPaddingTop = (height: number) => {

    const paddingTop = useSharedValue(height);
    const { ConfigState } = useContext(ConfigContext);

    useEffect(() => {
        if (ConfigState.keyboardStatus) {
            paddingTop.value = withTiming(10, { duration });
        } else {
            paddingTop.value = withTiming(height, { duration });
        }
    }, [ConfigState.keyboardStatus]);

    const animatedPaddingTop = useAnimatedStyle(() => {
        return {
            paddingTop: paddingTop.value
        };
    })

    return {
        animatedPaddingTop,
    }

}

export default animationPaddingTop;
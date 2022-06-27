import { useEffect, useContext } from "react";
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { height } from '@src/constants/animations';
import ConfigContext from '@src/contexts/config/ConfigContext'
import { duration } from '@src/constants/animations';

const animationPaddingTop = () => {

    const paddingTop = useSharedValue(height / 6);
    const { ConfigState } = useContext(ConfigContext);

    useEffect(() => {
        if (ConfigState.keyboardStatus) {
            paddingTop.value = withTiming(10, { duration });
        } else {
            paddingTop.value = withTiming(height / 6, { duration });
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
import React from "react";
import Animated from "react-native-reanimated";

import useLogo from '@src/animations/useLogo'

const Logo = () => {

    const { animatedScale } = useLogo();

    return (
        <Animated.Image source={require('@src/assets/imgs/adaptive-icon.png')} style={animatedScale} />
    )
}
export default Logo
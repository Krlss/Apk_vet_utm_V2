import React from "react";
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { height, width } from '@src/constants/animations';
import ConfigContext from '@src/contexts/config/ConfigContext'

const animationJustifyContent = () => {

    const justifyContent = useSharedValue(height / 2.5);



}

export default animationJustifyContent;
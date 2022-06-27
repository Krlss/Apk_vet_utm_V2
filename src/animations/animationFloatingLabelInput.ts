import { useState, useEffect, useContext } from "react";
import { StyleSheet } from 'react-native';
import AppStyles from '@src/themes/AppStyles';
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { defaultPositionText, textPostionMove } from '@src/constants/FloatinLabelInput';
import { duration } from "@src/constants/animations";
import ConfigContext from '@src/contexts/config/ConfigContext'

const useFloatingLabelInput = (value?: string) => {
    const [isFocused, setIsFocused] = useState(value ? true : false);
    const [isBlur, setIsBlur] = useState(false);
    const [show, setShow] = useState(false);

    const { ConfigState } = useContext(ConfigContext);

    const styles = ThisStyles(isFocused, isBlur, ConfigState.keyboardStatus);
    const moveText = useSharedValue(defaultPositionText);

    useEffect(() => {
        if (isFocused) {
            moveText.value = withTiming(defaultPositionText, { duration });
        } else {
            moveText.value = withTiming(textPostionMove, { duration });
        }
    }, [isFocused]);

    const animatedLabel = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: moveText.value }]
        };
    })

    return {
        isFocused,
        setIsFocused,
        styles,
        animatedLabel,
        show,
        setShow,
        isBlur,
        setIsBlur,
    }

}

const ThisStyles = (isFocused: boolean, isBlur: boolean, keyboardStatus: boolean) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: AppStyles.inputHeight.default,
            marginTop: AppStyles.margin.xlarge,
        },
        input: {
            borderColor: isFocused && !isBlur && keyboardStatus ? AppStyles.colour.yellow : AppStyles.colour.low_gray,
            paddingLeft: AppStyles.padding.medium,
            paddingRight: AppStyles.padding.xxxxlarge,
        },
        label: {
            position: 'absolute',
            backgroundColor: isFocused && keyboardStatus ? AppStyles.colour.white : AppStyles.colour.transparent,
            zIndex: isFocused && keyboardStatus ? 1 : 0,
            left: AppStyles.padding.large,
            fontSize: AppStyles.font.size.default,
            color: isFocused && keyboardStatus ? AppStyles.colour.yellow : AppStyles.colour.low_gray,
        }
    })
}

export default useFloatingLabelInput
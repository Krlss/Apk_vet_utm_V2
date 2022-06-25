import { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet } from 'react-native';
import AppStyles from '@src/themes/AppStyles';

const useFloatingLabelInput = (value?: string) => {
    const [isFocused, setIsFocused] = useState(value ? true : false);
    const [isBlur, setIsBlur] = useState(false);
    const [show, setShow] = useState(false);

    const styles = ThisStyles(isFocused, isBlur);
    const moveText = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(moveText, {
            toValue: isFocused ? 1 : 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [isFocused]);

    const yVal = moveText.interpolate({
        inputRange: [0, 1],
        outputRange: [AppStyles.inputHeight.default / 2 - (AppStyles.font.size.default / 1.5), -(AppStyles.font.size.default / 1.5)],
    });

    const animStyle = { transform: [{ translateY: yVal }] };

    return {
        isFocused,
        setIsFocused,
        styles,
        animStyle,
        show,
        setShow,
        isBlur,
        setIsBlur,
    }

}

const ThisStyles = (isFocused: boolean, isBlur: boolean) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: AppStyles.inputHeight.default,
            marginTop: AppStyles.margin.xlarge,
        },
        input: {
            borderColor: isFocused && isBlur ? AppStyles.colour.yellow : AppStyles.colour.low_gray,
            paddingLeft: AppStyles.padding.medium,
            paddingRight: AppStyles.padding.xxxxlarge,
        },
        label: {
            position: 'absolute',
            backgroundColor: isFocused ? AppStyles.colour.white : AppStyles.colour.transparent,
            zIndex: isFocused ? 1 : 0,
            left: AppStyles.padding.large,
            fontSize: AppStyles.font.size.default,
            color: isFocused ? AppStyles.colour.yellow : AppStyles.colour.low_gray,
        }
    })
}

export default useFloatingLabelInput
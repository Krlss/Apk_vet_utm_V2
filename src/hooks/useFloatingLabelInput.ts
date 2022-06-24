import { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet } from 'react-native';
import AppStyles from '../theme/AppStyles';

const useFloatingLabelInput = (value?: string) => {
    const [isFocused, setIsFocused] = useState(value ? true : false);
    const [show, setShow] = useState(false);

    const styles = ThisStyles(isFocused);
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
    }

}

const ThisStyles = (isFocused: boolean) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: AppStyles.inputHeight.default,
            marginTop: AppStyles.margin.xlarge,
        },
        input: {
            width: '100%',
            height: AppStyles.inputHeight.default,
            borderColor: isFocused ? AppStyles.colour.yellow : AppStyles.colour.grey,
            borderWidth: 1.3,
            borderRadius: AppStyles.inputBorderRadius.default,
            paddingLeft: AppStyles.padding.medium,
            paddingRight: AppStyles.padding.xxxxlarge,
            fontSize: AppStyles.font.size.medium,
            color: AppStyles.colour.grey
        },
        label: {
            position: 'absolute',
            backgroundColor: isFocused ? AppStyles.colour.white : AppStyles.colour.transparent,
            zIndex: isFocused ? 1 : 0,
            left: AppStyles.padding.large,
            fontSize: AppStyles.font.size.default,
            color: isFocused ? AppStyles.colour.yellow : AppStyles.colour.grey,
        }
    })
}

export default useFloatingLabelInput
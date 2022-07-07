import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import AppStyles from '@src/themes/AppStyles';
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { defaultPositionText, textPositionMove } from '@src/constants/FloatingLabelInput';
import { duration } from "@src/constants/animations";


/**
 * Input with floating label. Animation for floating label.
 * @param value
 * @param error
 * @return Animation for floating label.
 */

const useFloatingLabelInput = (value?: string, error?: string, secureTextEntry?: boolean) => {
    const [isFocused, setIsFocused] = useState(value ? true : false);
    const [isBlur, setIsBlur] = useState(false);
    const [show, setShow] = useState(false);

    const styles = ThisStyles({ isFocused, isBlur, error, secureTextEntry });
    const moveText = useSharedValue(defaultPositionText);
    const fontSize = useSharedValue(AppStyles.font.size.default);

    useEffect(() => {
        if (isFocused) {
            moveText.value = withTiming(defaultPositionText, { duration });
            fontSize.value = withTiming(AppStyles.font.size.error, { duration });
        } else {
            moveText.value = withTiming(textPositionMove, { duration });
            fontSize.value = withTiming(AppStyles.font.size.default, { duration });
        }
    }, [isFocused]);

    const animatedLabel = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: moveText.value }],
            fontSize: fontSize.value,
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
        setIsBlur
    }

}

interface ThisStylesProps {
    /** Focus in input */
    isFocused: boolean;
    /** Press out of input */
    isBlur: boolean;
    /** Error in input */
    error?: string;
    /** Secure text entry */
    secureTextEntry?: boolean;
}

/** Styles for input and label. */
const ThisStyles = ({ isFocused, isBlur, error, secureTextEntry }: ThisStylesProps) => {

    const colorError = error && isFocused && AppStyles.color.error;
    const colorFocus = isFocused && AppStyles.color.yellow;
    const colorNormal = isBlur && AppStyles.color.low_gray;

    const borderError = error && isFocused && !isBlur && AppStyles.color.error;
    const borderFocus = isFocused && !isBlur && AppStyles.color.yellow;
    const borderNormal = isBlur && !isFocused && AppStyles.color.low_gray;

    return StyleSheet.create({
        container: {
            width: '100%',
            height: AppStyles.inputHeight.default,
            marginTop: AppStyles.margin.xlarge,
        },
        input: {
            borderColor: borderError || borderFocus || borderNormal || AppStyles.color.low_gray,
            paddingLeft: AppStyles.padding.medium,
            paddingRight: secureTextEntry ? AppStyles.padding.xxxxlarge : AppStyles.padding.medium,
        },
        label: {
            position: 'absolute',
            backgroundColor: isFocused ? AppStyles.color.default_bg : AppStyles.color.transparent,
            zIndex: isFocused ? 1 : 0,
            left: AppStyles.padding.large,
            fontWeight: isFocused ? 'bold' : 'normal',
            fontSize: isFocused ? AppStyles.font.size.error : AppStyles.font.size.default,
            color: colorError || colorFocus || colorNormal || AppStyles.color.low_gray,
        }
    })
}

export default useFloatingLabelInput
import React from "react";
import { View } from 'react-native';
import animationFloatingLabelInput from '@src/animations/animationFloatingLabelInput'
import ShowOrHiddenPassword from './ShowOrHiddenPassword';
import Animated from "react-native-reanimated";

import Input from './Input';
interface FloatingLabelInputProps {
    label: string;
    value?: string;
    secureTextEntry?: boolean;
    onChange?: (text: string) => void;
    onSubmitEditing?: () => void;
    [x: string]: any;
}

const FloatingLabelInput = ({ label, value, secureTextEntry, onChange, onSubmitEditing, ...props }: FloatingLabelInputProps) => {

    const { animatedLabel, setIsFocused, styles, setShow, show, setIsBlur } = animationFloatingLabelInput(value);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.label, animatedLabel]}>{label}</Animated.Text>
            <Input
                style={styles.input}
                onFocus={() => {
                    setIsFocused(true);
                    setIsBlur(false)
                }}
                onBlur={() => {
                    setIsFocused(value ? true : false);
                    setIsBlur(true)
                }}
                value={value}
                onChangeText={onChange}
                key={label}
                secureTextEntry={secureTextEntry && !show}
                onSubmitEditing={onSubmitEditing}
                {...props}
            />
            {secureTextEntry && <ShowOrHiddenPassword show={show} onPress={() => setShow(!show)} />}
        </View>
    )

}

export default FloatingLabelInput;

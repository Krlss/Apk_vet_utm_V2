import React, { useContext } from "react";
import { View, Animated } from 'react-native';
import useFloatingLabelInput from '@src/animations/useFloatingLabelInput'
import ShowOrHiddenPassword from './ShowOrHiddenPassword';
import ConfigContext from "@src/contexts/config/ConfigContext";

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

    const { animStyle, setIsFocused, styles, setShow, show, setIsBlur } = useFloatingLabelInput(value);

    const { ConfigState } = useContext(ConfigContext);

    console.log({ ConfigState });

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.label, animStyle]}>{label}</Animated.Text>
            <Input
                style={styles.input}
                onFocus={() => {
                    setIsFocused(true);
                    setIsBlur(true)
                }}
                onBlur={() => {
                    setIsFocused(value ? true : false);
                    setIsBlur(false)
                }}
                value={value}
                onChangeText={onChange}
                key={label}
                secureTextEntry={secureTextEntry && show}
                onSubmitEditing={onSubmitEditing}
                {...props}
            />
            {secureTextEntry && <ShowOrHiddenPassword show={show} onPress={() => setShow(!show)} />}
        </View>
    )

}

export default FloatingLabelInput;

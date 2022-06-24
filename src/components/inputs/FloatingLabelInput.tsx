import React from "react";
import { View, TextInput, Animated, TouchableOpacity } from 'react-native';
import useFloatingLabelInput from '../../hooks/useFloatingLabelInput'
import ShowOrHiddenPassword from './ShowOrHiddenPassword';

interface FloatingLabelInputProps {
    label: string;
    value?: string;
    secureTextEntry?: boolean;
    onChange?: (text: string) => void;
    onSubmitEditing?: () => void;
}

const FloatingLabelInput = ({ label, value, secureTextEntry, onChange, onSubmitEditing }: FloatingLabelInputProps) => {

    const { animStyle, setIsFocused, styles, setShow, show } = useFloatingLabelInput(value);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.label, animStyle]}>{label}</Animated.Text>
            <TextInput
                style={styles.input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(value ? true : false)}
                value={value}
                onChangeText={onChange}
                key={label}
                secureTextEntry={secureTextEntry && show}
                onSubmitEditing={onSubmitEditing}
            />
            {secureTextEntry && <ShowOrHiddenPassword show={show} onPress={() => setShow(!show)} />}
        </View>
    )

}

export default FloatingLabelInput;

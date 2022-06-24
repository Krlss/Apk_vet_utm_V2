import React from 'react';
import { Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import FloatingLabelInput from './components/inputs/FloatingLabelInput';

import useData from './hooks/useData';
import useAuth from './hooks/useAuth';

const Aplication = () => {

    const { data, handleChange } = useData();
    const { Keyboard, keyboardStatus } = useAuth();
    console.log({ data })

    const styles = ThisStyles(keyboardStatus);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.icon} source={require('./assets/imgs/adaptive-icon.png')} />
            <Text style={styles.text}>Findpets {keyboardStatus ? '1' : '0'}</Text>
            <FloatingLabelInput onSubmitEditing={Keyboard.dismiss} value={data?.email} onChange={(value) => handleChange('email', value)} label='Correo electrónico' />
            <FloatingLabelInput onSubmitEditing={Keyboard.dismiss} value={data?.password} secureTextEntry onChange={(value) => handleChange('password', value)} label='Contraseña' />
        </SafeAreaView>
    )
}
export default Aplication

const ThisStyles = (keyboardStatus: boolean) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: keyboardStatus ? 'flex-start' : 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingHorizontal: 20
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFB509',
            fontFamily: 'WorkSans-Bold',
        },
        icon: {
            width: 107,
            height: 92,
        }
    })
} 
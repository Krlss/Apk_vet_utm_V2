import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Animated } from 'react-native'
import FloatingLabelInput from './components/inputs/FloatingLabelInput';

import useData from './hooks/useData';
import useAuth from './hooks/useAuth';

import useLogo from '@src/animations/useLogo'
import ConfigProvider from '@src/contexts/config/ConfigProvider';


const Aplication = () => {

    const { data, handleChange } = useData();
    const { Keyboard, keyboardStatus } = useAuth();
    const { boxStyle, paddingTopStyle } = useLogo(keyboardStatus);

    return (
        <ConfigProvider>
            <Animated.View style={[styles.container, paddingTopStyle]}>
                <Animated.Image style={boxStyle} source={require('./assets/imgs/adaptive-icon.png')} />
                <Text style={styles.text_logo}>Findpets</Text>
                <FloatingLabelInput autoFocus={true} onSubmitEditing={Keyboard.dismiss} value={data?.email} onChange={(value) => handleChange('email', value)} label='Correo electrónico' />
                <FloatingLabelInput autoCorrect={false} onSubmitEditing={Keyboard.dismiss} value={data?.password} secureTextEntry onChange={(value) => handleChange('password', value)} label='Contraseña' />
                <View style={styles.container_links}>
                    <Text style={styles.text}>Registrarse</Text>
                    <Text style={styles.text}>Olvidé mi contraseña</Text>
                </View>
                <TouchableHighlight style={styles.button_login}>
                    <Text style={styles.text_login}>Iniciar sesión</Text>
                </TouchableHighlight>
            </Animated.View>
        </ConfigProvider>
    )
}
export default Aplication

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    text_logo: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFB509',
        fontFamily: 'WorkSans-Bold',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#E0E0E0',
        fontFamily: 'WorkSans-Regular',
    },
    container_links: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 10
    },
    text_login: {
        fontSize: 22,
        color: 'white',
        fontWeight: '700',
        fontFamily: 'Poppins-SemiBold',
    },
    button_login: {
        width: '100%',
        height: 45,
        backgroundColor: '#FFB509',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    }
})
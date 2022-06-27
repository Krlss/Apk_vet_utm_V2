import useData from "@src/hooks/useData";
import useAuth from "@src/hooks/useConfig";

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import FloatingLabelInput from '@src/components/inputs/FloatingLabelInput';
import Logo from "@src/components/images/Logo";

const Login = () => {
    const { data, handleChange } = useData();
    const { KeyboardDissmiss } = useAuth();

    return (
        <Animated.ScrollView contentContainerStyle={styles.container}>
            <Logo />
            <Text style={styles.text_logo}>FindsPets</Text>
            <FloatingLabelInput onSubmitEditing={KeyboardDissmiss} value={data?.email} onChange={(value) => handleChange('email', value)} label='Correo electrónico' />
            <FloatingLabelInput autoCorrect={false} onSubmitEditing={KeyboardDissmiss} value={data?.password} secureTextEntry onChange={(value) => handleChange('password', value)} label='Contraseña' />
            <View style={styles.container_links}>
                <Text style={[styles.text, { color: '#FFB509' }]}>Registrarse</Text>
                <Text style={styles.text}>Olvidé mi contraseña</Text>
            </View>
            <TouchableHighlight style={styles.button_login}>
                <Text style={styles.text_login}>Iniciar sesión</Text>
            </TouchableHighlight>
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 50,
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

export default Login;
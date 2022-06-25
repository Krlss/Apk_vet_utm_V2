import { useState, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const useLogo = (keyboardStatus: boolean) => {

    const [logoAnimate, setLogoAnimate] = useState(new Animated.Value(150));
    const [paddingTop, setPaddingTop] = useState(new Animated.Value(Dimensions.get('window').height / 4 - 100));


    useEffect(() => {
        Animated.timing(logoAnimate, {
            toValue: keyboardStatus ? 0 : 150,
            duration: 100,
            useNativeDriver: false,
        }).start();

        Animated.timing(paddingTop, {
            toValue: keyboardStatus ? 20 : Dimensions.get('window').height / 4 - 100,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [keyboardStatus]);

    const boxStyle = {
        height: logoAnimate,
        width: logoAnimate,
    }

    const paddingTopStyle = {
        paddingTop: paddingTop,
    }

    return {
        boxStyle,
        paddingTopStyle,
    }


}

export default useLogo
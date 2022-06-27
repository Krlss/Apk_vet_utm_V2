import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import EyeShow from '@src/assets/icons/EyeShow.svg';
import EyeHidden from '@src/assets/icons/EyeHidden.svg';
import AppStyles from "@src/themes/AppStyles";

interface ShowOrHiddenPasswordProps {
    show: boolean;
    onPress: () => void;
}

const ShowOrHiddenPassword = ({ show, onPress }: ShowOrHiddenPasswordProps) => {
    return (
        <TouchableHighlight underlayColor={AppStyles.colour.transparent} style={styles.touchableOpacity} onPress={onPress}>
            {show ? <EyeHidden width={25} height={25} fill={AppStyles.colour.low_gray} /> : <EyeShow width={25} height={25} fill={AppStyles.colour.low_gray} />}
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    touchableOpacity: {
        position: 'absolute',
        right: AppStyles.padding.medium,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ShowOrHiddenPassword;
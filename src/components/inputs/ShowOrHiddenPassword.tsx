import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import EyeShow from '../../assets/icons/EyeShow.svg';
import EyeHidden from '../../assets/icons/EyeHidden.svg';
import AppStyles from "../../theme/AppStyles";

const ShowOrHiddenPassword = ({ show, onPress }: { show: boolean; onPress: () => void }) => {
    return (
        <TouchableHighlight underlayColor={AppStyles.colour.transparent} style={styles.touchableOpacity} onPress={onPress}>
            {show ? <EyeShow width={25} height={25} fill={AppStyles.colour.grey} /> : <EyeHidden width={25} height={25} fill={AppStyles.colour.grey} />}
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
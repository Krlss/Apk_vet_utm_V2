import React from 'react';
import ConfigProvider from '@src/contexts/config/ConfigProvider';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import StackAuth from '@src/navigations/stackAuth';

const Aplication = () => {

    return (
        <ConfigProvider>
            <NavigationContainer>
                <StackAuth />
                <StatusBar backgroundColor='black' />
            </NavigationContainer>
        </ConfigProvider>
    )
}
export default Aplication
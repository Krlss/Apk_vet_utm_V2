import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@src/pages/auth/login';

const Stack = createNativeStackNavigator();

const StackAuth = () => {
    return (
        <Stack.Navigator initialRouteName='LOGIN'>
            <Stack.Screen name='LOGIN' component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default StackAuth;

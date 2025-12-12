import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Splash from '../Screens/Auth/Splash';



const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="Splash" component={Splash} />
    
        </Stack.Navigator>
    );
};

export default AuthStack;

import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Home from '../Screens/Home/Home';
import ChatScreen from '../Screens/Home/ChatScreen';
import ChatThemeScreen from '../Screens/Home/ChatThemeScreen';

const Stack = createStackNavigator();

// create a component
const UserStack = () => {
    const { login_status, guest_status } = useSelector(state => state.User);
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ChatThemeScreen" component={ChatThemeScreen} />

        </Stack.Navigator>
    );
};

export default UserStack;

import 'react-native-gesture-handler';
import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationService from './src/Services/Navigation';
import AuthStack from './src/Navigations/AuthStack';
import UserStack from './src/Navigations/UserStack';
import { ThemeProvider, useTheme } from './ThemeContext';

const Stack = createStackNavigator();

const App = () => {
  

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <SafeAreaProvider>
                    <ThemeContent  />
                </SafeAreaProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

const ThemeContent = ({ login_status, guest_status }) => {
    const { colors } = useTheme();
    const navigatorRef = useRef(null);

    return (
        <NavigationContainer
            ref={(ref) => {
                navigatorRef.current = ref;
                NavigationService.setTopLevelNavigator(ref);
            }}
        >
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                   <Stack.Screen name="AuthStack" component={AuthStack} />
                 
                     
                        <Stack.Screen name="UserStack" component={UserStack} />
                  
                   
                       
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};
;

export default App;

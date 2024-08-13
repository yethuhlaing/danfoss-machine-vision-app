
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Handle font loading errors
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    // Hide the splash screen after fonts are loaded and 4 seconds have passed
    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hideAsync();
        }, 1000); // 

        return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }, [fontsLoaded]);

    return <RootLayoutNav />;
}


// Root Navigation Component
function RootLayoutNav() {
    return (
        <RootSiblingParent> 
            <ThemeProvider value={DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="(modals)/modal"
                        options={{
                            presentation: 'card',
                            headerBackTitle: 'Scan',
                            headerTitle: (props) => <Image source={require('../assets/images/danfoss.png')} className='w-24 h-10' />,
                        }}
                    />
                </Stack>
            </ThemeProvider>
        </RootSiblingParent>


    );
}

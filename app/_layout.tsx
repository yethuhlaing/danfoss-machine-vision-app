import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';
import { Pressable } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen
                name="modal"
                options={{ presentation: 'modal' }}
            />

        </Stack>
    );
}

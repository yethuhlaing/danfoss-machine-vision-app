import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Suspense, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SQLiteProvider} from "expo-sqlite/next"
import { ActivityIndicator, Text, View } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system'
import * as DocumentPicker from 'expo-document-picker';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const [dbLoaded, setDbLoaded] = useState(false)


    const loadDatabase = async () => {
        const dbName = "motor_database.db"
        const dbAsset = require("../assets/database/motor_database.db")
        const dbUri = Asset.fromModule(dbAsset).uri
        const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`

        const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
        if (!fileInfo.exists) {
            await FileSystem.makeDirectoryAsync(
                `${FileSystem.documentDirectory}SQLite`,
                { intermediates: true }
            );
            await FileSystem.downloadAsync(dbUri, dbFilePath)
        }
    }

    useEffect(() => {
        loadDatabase()
            .then(() => setDbLoaded(true))
            .catch((e) => console.error(e))
    }, [])

    if (!dbLoaded) {
        return (
            <View>
                <ActivityIndicator size={"large"} />
                <Text>Loading Database ...</Text>
            </View>
        )
    }
    return (
        <Suspense fallback={
            <View>
                <ActivityIndicator size={"large"} />
                <Text>Loading Database ...</Text>
            </View>
        }>
            <SQLiteProvider databaseName='motor_database.db' useSuspense>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="modal"
                        options={{ 
                            presentation: 'card',
                            headerBackTitle: 'Scan' 
                        }}
                    />
                </Stack>
            </SQLiteProvider>

        </Suspense>
    );
}

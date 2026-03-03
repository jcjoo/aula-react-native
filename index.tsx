import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';

import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold
} from '@expo-google-fonts/lato';

import App from './src/app/Orcamento';

SplashScreen.preventAutoHideAsync();

function Main() {
    const [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView} >
            <App />
        </View>
    );
}

registerRootComponent(Main);
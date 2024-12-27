import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

import { MusicProvider } from './providers/MusicProvider';

// import Sound from 'react-native-sound';
// import { Text } from 'react-native';

export default function Layout() {

    const [loaded, error] = useFonts({
        'Poppins-Regular': require('./../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    });

    // const sound = useRef(null);

    // useEffect(() => {
    //     const loadAndPlayMusic = async () => {
    //         const { sound: loadedSound } = await Audio.Sound.createAsync(
    //             require('../assets/bgmusic.mp3') // Your background music file
    //         );
    //         sound.current = loadedSound;
    //         console.log('sound.current', sound.current);
    //         await sound.current.setIsLoopingAsync(true); // Loop the music
    //         await sound.current.playAsync();
    //     };

    //     loadAndPlayMusic();

    //     return () => {
    //         if (sound.current) {
    //             sound.current.unloadAsync();
    //         }
    //     };
    // }, [])



    return (
        <MusicProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="(private)" options={{ headerShown: false }} />
                <Stack.Screen name="offline" options={{ headerShown: false }} />
                <Stack.Screen name="online" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
                <Stack.Screen name="tnc" options={{ presentation: 'modal', title: 'Terms and Condition' }} />
                <Stack.Screen name="register-avatar" options={{ headerShown: false }} />
                <Stack.Screen name='tutorial' options={{ headerShown: false }} />
            </Stack >
        </MusicProvider>
    );
}

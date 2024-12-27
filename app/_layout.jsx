import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
// import { Text } from 'react-native';

export default function Layout() {

    const [loaded, error] = useFonts({
        'Poppins-Regular': require('./../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    });
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(private)" options={{ headerShown: false }} />
            <Stack.Screen name="offline" options={{ headerShown: false }} />
            <Stack.Screen name="online" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
            <Stack.Screen name="tnc" options={{ presentation: 'modal', title: 'Terms and Condition' }} />
            <Stack.Screen name="register-avatar" options={{ headerShown: false }} />
            <Stack.Screen name='tutorial' options={{ headerShown: false }}/>
        </Stack >
    );
}

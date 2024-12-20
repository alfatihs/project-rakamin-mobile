import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{  headerShown: false }} />
            <Stack.Screen name="login" options={{  headerShown: false }} />
            <Stack.Screen name="(private)" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
            <Stack.Screen name="tnc" options={{ presentation: 'modal', title: 'Terms and Condition' }} />
        </Stack >
    );
}

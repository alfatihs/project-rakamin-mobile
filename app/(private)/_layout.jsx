import { Tabs, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './index';
import History from './history';
import Leaderboard from './leaderboard';

export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{
                    headerShown: false
                }} />
                <Stack.Screen name="history" options={{
                    headerShown: false
                }} />
                <Stack.Screen name="leaderboard" options={{
                    headerShown: false
                }} />
                <Stack.Screen name='selectmode' options={{
                    headerShown: false
                }} />
            </Stack>
        </SafeAreaView>
    );
    {/* <Tabs
    screenOptions={{ tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'gray' }}>
    <Tabs.Screen
        name="index"
        options={{
            headerShown: false,
            tabBarIcon: (({ color }) => <Ionicons name='home' size={20} color={color} />),
            tabBarLabel: 'Home'
        }}
    />
    <Tabs.Screen
        name="history"
        options={{
            headerShown: false,
            tabBarIcon: (({ color }) => <Ionicons name='home' size={20} color={color} />),
            tabBarLabel: 'Home'
        }}
    />
    <Tabs.Screen
        name="leaderboard"
        options={{
            headerShown: false,
            tabBarIcon: (({ color }) => <Ionicons name='home' size={20} color={color} />),
            tabBarLabel: 'Home'
        }}
    />
</Tabs> */}
}
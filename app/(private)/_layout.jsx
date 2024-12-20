import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{ tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'gray' }}>
                <Tabs.Screen
                    name="index"
                    screenOptions={{}}
                    options={{
                        headerShown: false,
                        tabBarIcon: (({ color }) => <Ionicons name='home' size={20} color={color} />),
                        tabBarLabel: 'Home'
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";

export default function Index() {
    const router = useRouter();
    const navigationState = useRootNavigationState();
    // navigationState?.key akan berisi nilai jika root sudah siap

    useEffect(() => {
        // Jika root layout belum siap, jangan navigasi
        if (!navigationState?.key) return;

        // Begitu root layout siap, baru panggil router.push
        router.replace("/login");
    }, [navigationState?.key]);

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

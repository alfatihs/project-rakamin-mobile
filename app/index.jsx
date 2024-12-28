import React, { useEffect } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Index() {
    const router = useRouter();
    useEffect(() => {
        const getAuthToken = async () => {
            const authToken = await SecureStore.getItemAsync('authToken');
            // console.log(authToken, 'hasil authtoken ');
            if (authToken) {
                router.replace('/(private)');
            } else {
                router.replace('/login');
            }
        }
        getAuthToken();
    }, [])

    return (
        <ImageBackground style={{ flex: 1 }} source={require('./../assets/background-image.png')} resizeMode='cover' />
    );
}

import { Stack } from "expo-router";

export default function OnlineLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='roommaster' options={{ headerShown: false }} />
      <Stack.Screen name='joinroom' options={{ headerShown: false }} />
      <Stack.Screen name='ready' options={{ headerShown: false }} />
      <Stack.Screen name="gameLoadingScreen" options={{ headerShown: false }} />
      <Stack.Screen name="gameScreenOnline" options={{ headerShown: false }} />
      <Stack.Screen name="resultOnline" options={{ headerShown: false }} />
    </Stack>
  );
}
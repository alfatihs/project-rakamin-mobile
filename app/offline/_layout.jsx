import { Stack } from "expo-router";

export default function OfflineLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="gameScreenOffline" options={{ title: "Game Screen" }} />
      <Stack.Screen name="result" options={{ title: "Result Screen" }} />
    </Stack>
  );
}
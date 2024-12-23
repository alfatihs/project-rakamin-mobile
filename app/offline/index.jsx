// app/offline/prepareGame.jsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function PrepareGameScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [hasNavigated, setHasNavigated] = useState(false); // Tambahkan state untuk mengontrol navigasi


  useEffect(() => {
    if (countdown <= 0 && !hasNavigated) {
      // Navigasi hanya jika countdown selesai dan belum navigasi
      setHasNavigated(true); // Tandai navigasi sudah terjadi
      router.push("/offline/gameScreenOffline");
      return;
    }

    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown, hasNavigated, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game will start in...</Text>
      <Text style={styles.countdown}>{countdown}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EB",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  countdown: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#0C356A",
  },
});

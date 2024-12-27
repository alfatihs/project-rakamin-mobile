import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function GameLoadingScreen() {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

  // Ambil roomId dan bearerToken dari SecureStorage saat komponen dimount
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const storedRoomId = await SecureStore.getItemAsync("roomID");
        const storedToken = await SecureStore.getItemAsync("authToken");

        if (!storedRoomId || !storedToken) {
          throw new Error("Room ID atau Bearer Token tidak ditemukan");
        }

        setRoomId(storedRoomId);
        setBearerToken(storedToken);
      } catch (error) {
        console.error("Error fetching credentials:", error.message);
      }
    };

    fetchCredentials();
  }, []);

  // Fungsi untuk melakukan fetch
  const fetchGameStatus = async () => {
    if (isFetching || !roomId || !bearerToken) return; // Jangan fetch jika sedang berjalan atau data belum lengkap

    setIsFetching(true);
    try {
      console.log('fetching!')
      const response = await fetch(
        `https://project-rakamin-api.vercel.app/rooms/info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({ roomId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch game status");
      }

      const data = await response.json();
      console.log(data.data, 'hasil response!')
      const { draw, win, lose } = data.data;

      // Logika untuk menentukan kapan navigasi ke result
      if ((draw && win === null && lose === null) || (!draw && (win !== null || lose !== null))) {
        router.push("/online/resultOnline"); // Pindah ke halaman result
      }
    } catch (error) {
      console.error("Error fetching game status:", error.message);
    } finally {
      setIsFetching(false); // Selesai fetching
    }
  };

  // Jalankan fetch secara berulang
  useEffect(() => {
    const interval = setInterval(() => {
      fetchGameStatus();
    }, 2000); // Cek setiap 2 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, [roomId, bearerToken]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C356A",
    alignItems: "center",
    justifyContent: "center",
  },
});

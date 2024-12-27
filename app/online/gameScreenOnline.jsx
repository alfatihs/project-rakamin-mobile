import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const gestures = [
  { name: "rock", image: require("../../assets/rock.png") },
  { name: "paper", image: require("../../assets/paper.png") },
  { name: "scissors", image: require("../../assets/scissors.png") },
];

export default function GameScreenOnline() {
  const router = useRouter();
  const {
    userScore: initialUserScore = 0,
    computerScore: initialComputerScore = 0,
  } = useLocalSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [userPick, setUserPick] = useState(null);
  const [roomId, setRoomId] = useState(null); // Ganti dengan room ID dinamis
  const [bearerToken, setBearerToken] = useState(null);

  // Ambil Bearer Token dari SecureStorage saat komponen dimount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        const roomId = await SecureStore.getItemAsync("roomID");
        if (token && roomId) {
          setBearerToken(token);
          setRoomId(roomId);
        } else {
          console.error(
            "Bearer token dan room id tidak ditemukan di SecureStorage"
          );
        }
      } catch (error) {
        console.error(
          "Error fetching token and room id from SecureStorage:",
          error.message
        );
      }
    };

    fetchToken();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (countdown <= 0) {
      if (!userPick) {
        // Kirim "unsubmit" jika user tidak memilih gesture
        sendGameData("unsubmit");
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, userPick]);

  // Handle user pick
  const handleUserPick = (gesture) => {
    setUserPick(gesture);
    sendGameData(gesture); // Kirim data ke API
  };

  // Send game data to API
  const sendGameData = async (handPosition) => {
    if (!bearerToken) {
      console.error("Bearer token belum tersedia");
      return;
    }

    try {
      console.log("roomId:", roomId);
      console.log("handPosition:", handPosition);
      console.log("bearerToken:", bearerToken);
      const response = await fetch(
        "https://project-rakamin-api.vercel.app/game/finish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            roomId: roomId,
            handPosition: handPosition,
          }),
        }
      );
      
      const data = await response.json(); // Baca respons dari server

      if (!response.ok) {
        console.error("Error Response Data:", data); // Log detail error dari server
        throw new Error(data.message || "Failed to send game data");
      }

      console.log("API Response:", data);

      router.replace("/online/gameLoadingScreen");
    } catch (error) {
      console.error("Error sending game data:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.handsContainer}>
        {gestures.map((gesture) => (
          <TouchableOpacity
            key={gesture.name}
            style={styles.handBox}
            onPress={() => handleUserPick(gesture.name)}
          >
            <Image source={gesture.image} style={styles.handImage} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Countdown */}
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>
          {countdown > 0
            ? `00:${countdown < 10 ? `0${countdown}` : countdown}`
            : "00:00"}
        </Text>
      </View>
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
  handsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  handBox: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  handImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  countdownContainer: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countdownText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

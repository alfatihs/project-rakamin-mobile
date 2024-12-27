import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useMusic } from "../providers/MusicProvider";

const gestures = [
  { name: "rock", image: require("../../assets/rock.png") },
  { name: "paper", image: require("../../assets/paper.png") },
  { name: "scissors", image: require("../../assets/scissors.png") },
];

export default function GameScreenOffline() {
  const { playClickSound } = useMusic();
  const router = useRouter();
  const { userScore: initialUserScore = 0, computerScore: initialComputerScore = 0 } =
    useLocalSearchParams();

  const [countdown, setCountdown] = useState(10);
  const [userPick, setUserPick] = useState(null);
  const [computerPick, setComputerPick] = useState(null);
  const [scores, setScores] = useState({
    user: parseInt(initialUserScore),
    computer: parseInt(initialComputerScore),
  });

  // Countdown logic
  useEffect(() => {
    if (countdown <= 0 || userPick) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleEndGame(); // Auto-end jika waktu habis
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, userPick]);

  // Generate random choice for computer
  const getRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * gestures.length);
    return gestures[randomIndex].name;
  };

  // Handle user pick
  const handleUserPick = (gesture) => {
    setUserPick(gesture);
    const computerChoice = getRandomPick();
    setComputerPick(computerChoice);

    // Delay before navigating to result page
    setTimeout(() => handleEndGame(gesture, computerChoice), 1000);
  };

  // Determine winner
  const determineWinner = (user, computer) => {
    if (user === computer) return "draw";
    if (
      (user === "rock" && computer === "scissors") ||
      (user === "scissors" && computer === "paper") ||
      (user === "paper" && computer === "rock")
    ) {
      return "user";
    }
    return "computer";
  };

  // Handle end game
  const handleEndGame = (userChoice = null, computerChoice = null) => {
    const result = determineWinner(userChoice, computerChoice);
    if (result === "user") {
      setScores((prev) => ({ ...prev, user: prev.user + 1 }));
    } else if (result === "computer") {
      setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }

    router.push({
      pathname: "/offline/result",
      params: {
        userChoice: userChoice || "none",
        computerChoice: computerChoice || getRandomPick(),
        userScore: scores.user,
        computerScore: scores.computer,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.handsContainer}>
        {gestures.map((gesture) => (
          <TouchableOpacity
            key={gesture.name}
            style={styles.handBox}
            onPress={() => { playClickSound(); handleUserPick(gesture.name) }}
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
    fontFamily: 'Poppins-Regular'
  },
});

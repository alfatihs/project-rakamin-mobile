import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useMusic } from "../providers/MusicProvider";

// Gesture images for user (blue shirt)
const userGestures = {
  rock: require("../../assets/rock.png"),
  paper: require("../../assets/paper.png"),
  scissors: require("../../assets/scissors.png"),
};

// Gesture images for computer (red shirt)
const computerGestures = {
  rock: require("../../assets/computer-rock.png"),
  paper: require("../../assets/computer-paper.png"),
  scissors: require("../../assets/computer-scissors.png"),
};

export default function ResultScreen() {
  const { playClickSound } = useMusic();
  const router = useRouter();
  let { userChoice, computerChoice, userScore, computerScore } =
    useLocalSearchParams();

  if (userChoice === "none") {
    userChoice = null
  }
  const [countdown, setCountdown] = useState(5);
  const [scores, setScores] = useState({
    user: parseInt(userScore) || 0,
    computer: parseInt(computerScore) || 0,
  });

  // Determine the winner and update scores
  useEffect(() => {
    const result = determineWinner(userChoice, computerChoice);
    if (result === "user") {
      setScores((prev) => ({ ...prev, user: prev.user + 1 }));
    } else if (result === "computer") {
      setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }
  }, []);

  // Countdown logic
  useEffect(() => {
    if (countdown <= 0) {
      router.replace({
        pathname: "/offline/gameScreenOffline",
        params: {
          userScore: scores.user,
          computerScore: scores.computer,
        },
      });
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Determine the winner
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => { playClickSound(); router.replace("/(private)") }}
      >
        <Text style={styles.finishText}>Selesaikan</Text>
        <MaterialIcons name="logout" size={20} color="#FFF0CE" />
      </TouchableOpacity>

      {/* Result Hands */}
      <View style={styles.handsContainer}>
        {/* User Hand */}
        <View style={styles.resultBox}>
          {userChoice ? (
            <Image
              source={userGestures[userChoice]}
              style={styles.handImageUser}
            />
          ) : (
            <View style={styles.placeholderBox} />
          )}
          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>{scores.user}</Text>
          </View>
        </View>

        {/* Computer Hand */}
        <View style={styles.resultBox}>
          {computerChoice ? (
            <Image
              source={computerGestures[computerChoice]}
              style={styles.handImageComputer}
            />
          ) : (
            <View style={styles.placeholderBox} />
          )}
          <View style={styles.scoreBoxComputer}>
            <Text style={styles.scoreText}>{scores.computer}</Text>
          </View>
        </View>
      </View>

      {/* Countdown */}
      <Text style={styles.countdownText}>
        Otomatis kembali dalam waktu {countdown} detik...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C356A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  finishButton: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5, // Jarak antara teks dan ikon
    marginTop: 30
  },
  finishText: {
    color: "#FFF0CE",
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
  handsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 40,
  },
  resultBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  handImageUser: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    transform: [{ rotate: "90deg" }],
  },
  handImageComputer: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    transform: [{ rotate: "270deg" }],
  },
  placeholderBox: {
    width: 150,
    height: 150,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  scoreBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-start'
  },
  scoreBoxComputer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-end'
  },
  scoreText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: "#000",
  },
  countdownText: {
    position: "absolute",
    bottom: 30,
    color: "#FFF0CE",
    fontSize: 16,
    textAlign: "center",
    fontFamily: 'Poppins-Bold',
    marginBottom: 40
  },
});

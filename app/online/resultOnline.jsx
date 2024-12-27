import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

// Gesture images for player 1 (blue shirt)
const userGestures = {
  rock: require("../../assets/rock.png"),
  paper: require("../../assets/paper.png"),
  scissors: require("../../assets/scissors.png"),
};

// Gesture images for player 2 (red shirt)
const computerGestures = {
  rock: require("../../assets/computer-rock.png"),
  paper: require("../../assets/computer-paper.png"),
  scissors: require("../../assets/computer-scissors.png"),
};

// Result images for modal
const resultImages = {
  win: require("../../assets/win.png"),
  draw: require("../../assets/draw.png"),
  lose: require("../../assets/lose.png"),
};

// Background image with stars
const modalBackgroundImage = require("../../assets/modal-background.png");

// Play again button image
const playAgainButtonImage = require("../../assets/play-again.png");

export default function ResultScreenOnline() {
  const router = useRouter();
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [result, setResult] = useState(null); // win, lose, draw
  const [modalVisible, setModalVisible] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);
  const [localUserId, setLocalUserId] = useState(null);

  // Fetch roomId, bearerToken, and userId
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        const roomID = await SecureStore.getItemAsync("roomID");
        const userId = await SecureStore.getItemAsync("userId"); // Simpan user ID lokal di SecureStore
        if (token && roomID && userId) {
          setBearerToken(token);
          setRoomId(roomID);
          setLocalUserId(userId); // Set user ID lokal
        } else {
          console.error("Bearer token, room ID, atau user ID tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching credentials:", error.message);
      }
    };

    fetchCredentials();
  }, []);

  // Fetch game data from API
  useEffect(() => {
    const fetchGameData = async () => {
      if (!roomId || !bearerToken || !localUserId) return;

      try {
        const response = await fetch(
          "https://project-rakamin-api.vercel.app/rooms/info",
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
          throw new Error("Failed to fetch game data.");
        }

        const data = await response.json();
        const gameData = data.data;

        // Update player choices
        setPlayer1Choice(gameData.hand_position_p1); // Player 1 choice
        setPlayer2Choice(gameData.hand_position_p2); // Player 2 choice

        // Determine result based on userId
        const userId = parseInt(localUserId, 10); // Konversi ke integer
        if (gameData.draw) {
          setResult("draw");
        } else if (gameData.win && gameData.win === userId) {
          setResult("win");
        } else if (gameData.lose && gameData.lose === userId) {
          setResult("lose");
        }

        // Show modal after 3 seconds
        setTimeout(() => setModalVisible(true), 3000);
      } catch (error) {
        console.error("Error fetching game data:", error.message);
      }
    };

    fetchGameData();
  }, [roomId, bearerToken, localUserId]);

  return (
    <View style={styles.container}>
      {/* Result Hands */}
      <View style={styles.handsContainer}>
        {/* Player 1 Hand */}
        <View style={styles.resultBox}>
          {player1Choice ? (
            <Image
              source={userGestures[player1Choice]}
              style={styles.handImageUser}
            />
          ) : (
            <View style={styles.placeholderBox} />
          )}
        </View>

        {/* Player 2 Hand */}
        <View style={styles.resultBox}>
          {player2Choice ? (
            <Image
              source={computerGestures[player2Choice]}
              style={styles.handImageComputer}
            />
          ) : (
            <View style={styles.placeholderBox} />
          )}
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Background with stars */}
          <Image source={modalBackgroundImage} style={styles.modalBackground} />

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.replace("/(private)")}
          >
            <Image source={require("../../assets/close.png")} style={styles.closeImage} />
          </TouchableOpacity>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            {/* Result Image */}
            {result && <Image source={resultImages[result]} style={styles.resultImage} />}

            {/* Play Again Button */}
            <TouchableOpacity onPress={() => router.replace("/playAgain")}>
              <Image source={playAgainButtonImage} style={styles.playAgainButton} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    backgroundColor: "rgba(32, 32, 32, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    width: "78%",
    height: "60%",
    resizeMode: "cover",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    marginTop: 40
  },
  closeImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  resultImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  playAgainButton: {
    width: 178,
    height: 50,
    resizeMode: "contain",
    alignItems: "baseline",
  },
});

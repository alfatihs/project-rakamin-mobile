import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  FlatList,
  SafeAreaView,
  ActivityIndicator, // <-- tambahkan
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import Button from "../components/ButtonAuth";

const API_URL = "https://project-rakamin-api.vercel.app/auth/register";
const AVATAR_BASE_URL = "https://avatar.iran.liara.run/public";

function generateUniqueAvatars(count) {
  const uniqueIds = new Set();
  while (uniqueIds.size < count) {
    const randId = Math.floor(Math.random() * 50) + 1;
    uniqueIds.add(randId);
  }
  return Array.from(uniqueIds).map((id, index) => ({
    id: String(index + 1),
    uri: `${AVATAR_BASE_URL}/${id}`,
  }));
}

export default function RegisterAvatarScreen() {
  const router = useRouter();
  // Dapatkan name, email, password dari screen sebelumnya
  const { name, email, password } = useLocalSearchParams();

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // <-- state loading

  useEffect(() => {
    const avatarArray = generateUniqueAvatars(20);
    setAvatars(avatarArray);
  }, []);

  const handleRegister = async () => {
    if (!selectedAvatar) {
      Alert.alert("Pilih Avatar", "Silahkan pilih avatar terlebih dahulu.");
      return;
    }

    setIsLoading(true); // <-- Mulai loading

    try {
      const res = await axios.post(API_URL, {
        name,
        email,
        password,
        avatar: selectedAvatar,
      });
      console.log("Register success:", res.data);
      Alert.alert("Berhasil Daftar", "Akun berhasil dibuat!");
      router.replace("/tutorial");
    } catch (error) {
      console.log("Error register:", error);
      Alert.alert("Gagal Daftar", "Silakan periksa koneksi atau data Anda.");
    } finally {
      setIsLoading(false); // <-- Berhenti loading
    }
  };

  const renderAvatarItem = ({ item }) => {
    const isSelected = selectedAvatar === item.uri;
    return (
      <TouchableOpacity
        style={[
          styles.avatarContainer,
          isSelected && styles.selected,
        ]}
        onPress={() => setSelectedAvatar(item.uri)}
      >
        <Image source={{ uri: item.uri }} style={styles.avatar} />
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.wrapper}>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.title}>Pilih Avatar</Text>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={avatars}
              keyExtractor={(item) => item.id}
              renderItem={renderAvatarItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center" }}
            />
          </View>

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#FFC436" />
            ) : (
              <Button
                text="Daftar"
                bgColor="#0C356A"
                onPress={handleRegister}
              />
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    resizeMode: "cover",
  },
  selected: {
    borderColor: "blue",
  },
  buttonContainer: {
    marginBottom: 20,
    // mis. alignItems: "center" jika ingin tombol di tengah
    // alignItems: "center",
  },
});

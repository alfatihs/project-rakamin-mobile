import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { z } from "zod";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import CheckBox from "expo-checkbox";
import Button from "../components/ButtonAuth";
import { useMusic } from "./providers/MusicProvider";

const loginSchema = z.object({
  email: z.string().nonempty("Email wajib diisi").email("Format email tidak valid"),
  password: z
    .string()
    .nonempty("Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
});

export default function Login() {
  const { playClickSound } = useMusic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Tambahkan state untuk loading saat memeriksa token
  const [checkingToken, setCheckingToken] = useState(true);

  // Periksa token saat pertama kali render
  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        // Jika token ada, langsung redirect ke homepage
        router.replace("/(private)");
      } else {
        // Jika tidak ada token, selesaikan loading
        setCheckingToken(false);
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      setErrors({ email: "", password: "" });
      loginSchema.parse({ email, password });

      setIsLoading(true);

      const res = await axios.post(
        "https://project-rakamin-api.vercel.app/auth/login",
        {
          email,
          password,
        }
      );
      // console.log(res.data.data.token);
      await SecureStore.setItemAsync("authToken", res?.data?.data?.token);
      // console.log('token set!', res.data.data.token);
      router.replace("/(private)");
    } catch (err) {
      console.log("Login error:", err);
      if (err instanceof z.ZodError) {
        const fieldErrors = { email: "", password: "" };
        err.issues.forEach((issue) => {
          if (issue.path[0] === "email") {
            fieldErrors.email = issue.message;
          }
          if (issue.path[0] === "password") {
            fieldErrors.password = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        if (axios.isAxiosError(err) && err.response) {
          Alert.alert(err?.response?.data.messege || "Terjadi kesalahan");
        } else {
          Alert.alert(
            "Network Error",
            "Periksa koneksi internet Anda dan coba lagi."
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Jika sedang memeriksa token, tampilkan spinner (atau layar kosong)
  if (checkingToken) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0C356A" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={require("../assets/tuwaga_logo.png")}
            style={styles.logo}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <Text style={styles.label}>Kata Sandi</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan kata sandi"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <View style={styles.row}>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                style={styles.checkbox}
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? "#4630EB" : undefined}
              />
              <Text style={styles.checkBoxLabel}>Ingat Saya</Text>
            </View>
            <Pressable onPress={() => {
              playClickSound()
              Alert.alert("Fitur lupa password belum ada")
            }}>
              <Text style={{ color: "#19918F" }}>Lupa Password</Text>
            </Pressable>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#FFC436" />
          ) : (
            <Button text="Masuk" onPress={() => { playClickSound(); handleLogin() }} bgColor="#0C356A" />
          )}

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>Belum punya akun? </Text>
            <Link style={{ color: "#19918F" }} href="/register">
              Daftar
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 25,
    resizeMode: "contain",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 5,
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginStart: 5,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 5,
  },
  checkBoxLabel: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8EB",
  },
});

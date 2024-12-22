import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Pressable,
  ImageBackground,
} from "react-native";
import { Link, router } from "expo-router";
import { z } from "zod";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import CheckBox from 'expo-checkbox'; // jika butuh checkbox
import Button from "../components/ButtonAuth";

const loginSchema = z.object({
  email: z.string().nonempty("Email wajib diisi").email("Format email tidak valid"),
  password: z
    .string()
    .nonempty("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false); // contoh state untuk checkbox

  const handleLogin = async () => {
    try {
      setErrors({ email: "", password: "" });
      loginSchema.parse({ email, password });

      const res = await axios.post(
        "https://project-rakamin-api.vercel.app/auth/login",
        {
          email,
          password,
        }
      );
      console.log(res.data.data.token)

      // Simpan token
      await SecureStore.setItemAsync("authToken", res?.data?.data?.token);

      // Pindah halaman
      router.push("/(private)");
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
          const statusCode = err.response.status;
          Alert.alert(err?.response?.data.messege || "Terjadi kesalahan");
        } else {
          Alert.alert(
            "Network Error",
            "Periksa koneksi internet Anda dan coba lagi."
          );
        }
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background-image.png")} // ganti dengan file pattern Anda
      style={styles.background}
      resizeMode="cover" // atau 'contain', 'stretch' dsb.
    >
      <View style={styles.overlay}>
        {/* Konten Login */}
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require("../assets/dummy-logo.png")}
            style={styles.logo}
          />

          {/* Label & Input “Nama (email)” */}
          <Text style={styles.label}>Nama</Text>
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

          {/* Label & Input “Kata Sandi” */}
          <Text style={styles.label}>Kata Sandi</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan kata sandi"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          {/* Ingat Saya + Lupa Password */}
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
            <Pressable onPress={() => Alert.alert("Fitur lupa password belum ada")}>
          <Text style={{ color: "#19918F" }}>Lupa Password</Text>
        </Pressable>
          </View>

          {/* Tombol “Masuk” */}
          <Button text="Masuk" onPress={handleLogin} bgColor="#0C356A" />

          {/* Punya akun? Register */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text>Belum punya akun? </Text>
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
  // style background
  background: {
    flex: 1,
    justifyContent: "center",
  },
  // overlay (opsional) bisa dipakai kalau mau kasih efek transparan gelap/terang
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    padding: 20,
    alignItems: "center",
    // jika ingin memaksa lebar tertentu atau margin sekeliling, bisa diatur di sini
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 90,
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
    marginBottom: 80,
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
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export default function RegisterDataScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleNext = () => {
    try {
      setErrors({ name: "", email: "", password: "" });
      registerSchema.parse({ name, email, password });
      // Jika valid, lanjut ke halaman lain
      
      router.push({
        pathname: "/register-avatar",
        params: { name, email, password },
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = { name: "", email: "", password: "" };
        err.issues.forEach((issue) => {
          if (issue.path[0] === "name") fieldErrors.name = issue.message;
          if (issue.path[0] === "email") fieldErrors.email = issue.message;
          if (issue.path[0] === "password")
            fieldErrors.password = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        Alert.alert("Terjadi kesalahan", "Silakan coba lagi.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Wrapper keseluruhan dengan flex:1 */}
        <View style={styles.wrapper}>
          {/* TOP: Progress Bar */}
          <View style={styles.topContainer}>
            <View style={styles.progressContainer}>
              <View style={styles.activeBar} />
              <View style={styles.inactiveBar} />
            </View>
          </View>

          {/* MIDDLE: Form */}
          <View style={styles.middleContainer}>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* BOTTOM: Tombol & Link */}
          <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Lanjut</Text>
            </Pressable>
            <View style={styles.bottomTextContainer}>
              <Text>Sudah punya akun? </Text>
              <Link href="/login" style={{ fontWeight: "600" }}>
                Masuk
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Background & Overlay
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  // Wrapper utama untuk menampung top, middle, bottom
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    // Ini kuncinya: space-between agar topContainer di atas & bottomContainer di bawah
    justifyContent: "space-between",
  },

  // TOP
  topContainer: {
    marginTop: 30
    // misalnya height minimal 50, atau auto
  },
  progressContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  activeBar: {
    width: 60,
    height: 6,
    backgroundColor: "#888",
    borderRadius: 4,
    marginRight: 8,
  },
  inactiveBar: {
    width: 60,
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginRight: 8,
  },

  // MIDDLE
  middleContainer: {
    // Isi form di tengah
  },
  label: {
    marginLeft: 5,
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 16,
    color: "#000",
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
    marginLeft: 5,
    marginBottom: 10,
  },

  // BOTTOM
  bottomContainer: {
    marginBottom: 30
    // Agar tombol & link "Masuk" menempel di bawah
  },
  button: {
    width: "100%",
    backgroundColor: "#0C356A",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

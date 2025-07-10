import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// Utilisation d'une image PNG pour le logo Afrique
const AfricaLogo = () => (
  <View style={styles.logoContainer}>
    <Image
      source={require("@/assets/background.jpg")}
      style={{ width: 80, height: 80, resizeMode: "contain" }}
    />
  </View>
);

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    // ScrollView pour permettre le défilement sur petits écrans
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      {/* Logo SVG Afrique */}
      <AfricaLogo />
      <Text style={[styles.title, { color: "#0a7e3a" }]}>
        Connectez-vous à AfriSwift
      </Text>

      <TouchableOpacity style={styles.googleBtn}>
        <View style={styles.googleBtnContent}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleBtnText}>Continuer avec Google</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>ou</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>✉️</Text>
          <TextInput
            style={styles.input}
            placeholder="Email ou numéro de téléphone"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
            <Text style={styles.inputIcon}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/(tabs)")}>
        <Text style={styles.loginBtnText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Vous n’avez pas de compte ? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.signupLink}>S’inscrire</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
// Styles pour la page d'accueil d'authentification

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32
  },
  googleBtn: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1
  },
  googleBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  googleBtnText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#222"
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 18
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0"
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#A0A0A0",
    fontWeight: "500"
  },
  inputContainer: {
    width: "100%",
    marginBottom: 8
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 12
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: "#222"
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 18
  },
  forgotText: {
    color: "#0a7e3a",
    fontWeight: "500",
    fontSize: 14
  },
  loginBtn: {
    backgroundColor: "#0a7e3a",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    marginBottom: 18
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  signupText: {
    color: "#222",
    fontSize: 15
  },
  signupLink: {
    color: "#0a7e3a",
    fontWeight: "600",
    fontSize: 15
  }
});

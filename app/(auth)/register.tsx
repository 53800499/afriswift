import { Colors } from "@/constants/Colors";
import { authService } from "@/core/services/authService";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const AfricaLogo = () => (
  <View style={styles.logoContainer}>
    <Image
      source={require("@/assets/background.jpg")}
      style={{ width: 80, height: 80, resizeMode: "contain" }}
    />
  </View>
);

const COUNTRIES = [
  { name: "Sénégal", flag: "🇸🇳", code: "SN" },
  { name: "Côte d'Ivoire", flag: "🇨🇮", code: "CI" },
  { name: "Mali", flag: "🇲🇱", code: "ML" },
  { name: "Burkina Faso", flag: "🇧🇫", code: "BF" },
  { name: "Bénin", flag: "🇧🇯", code: "BJ" },
  { name: "Togo", flag: "🇹🇬", code: "TG" },
  { name: "Niger", flag: "🇳🇪", code: "NE" },
  { name: "Guinée", flag: "🇬🇳", code: "GN" },
  { name: "Cameroun", flag: "🇨🇲", code: "CM" },
  { name: "Ghana", flag: "🇬🇭", code: "GH" },
  { name: "Nigeria", flag: "🇳🇬", code: "NG" },
  { name: "Maroc", flag: "🇲🇦", code: "MA" },
  { name: "Tunisie", flag: "🇹🇳", code: "TN" },
  { name: "Algérie", flag: "🇩🇿", code: "DZ" },
  { name: "Égypte", flag: "🇪🇬", code: "EG" }
];

export default function RegisterScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("personnel");
  const [acceptCGU, setAcceptCGU] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const countryInputRef = useRef<View>(null);
  const [dropdownTop, setDropdownTop] = useState(0);

  // Calculer la position du dropdown
  const showDropdown = () => {
    if (countryInputRef.current) {
      countryInputRef.current.measure(
        (fx: any, fy: any, width: any, height: any, px: any, py: any) => {
          setDropdownTop(py + height);
          setShowCountryList(true);
        }
      );
    } else {
      setShowCountryList(true);
    }
    Keyboard.dismiss();
  };

  // Fonction d'inscription
  const handleRegister = async () => {
    // Validation des champs
    if (
      !prenom.trim() ||
      !nom.trim() ||
      !email.trim() ||
      !telephone.trim() ||
      !password.trim()
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!authService.validateEmail(email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide");
      return;
    }

    if (!authService.validatePhone(telephone)) {
      Alert.alert(
        "Erreur",
        "Veuillez entrer un numéro de téléphone valide (format: +22945454545)"
      );
      return;
    }

    if (!authService.validatePassword(password)) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    if (!acceptCGU || !acceptPrivacy) {
      Alert.alert(
        "Erreur",
        "Veuillez accepter les conditions d'utilisation et la politique de confidentialité"
      );
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        firstName: nom.trim(),
        lastName: prenom.trim(),
        email: email.trim(),
        telephone: telephone.trim(),
        pays: country.name,
        motDePasse: password
      };

      const response = await authService.register(userData);

      if (response.success) {
        Alert.alert("Succès", response.message, [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/login")
          }
        ]);
      } else {
        Alert.alert("Erreur", response.message);
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <AfricaLogo />
      <Text style={[styles.title, { color: "#0a7e3a" }]}>
        Bienvenue sur AfriSwift
      </Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="#A0A0A0"
          value={prenom}
          onChangeText={setPrenom}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#A0A0A0"
          value={nom}
          onChangeText={setNom}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>✉️</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>📱</Text>
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone (ex: +22945454545)"
          placeholderTextColor="#A0A0A0"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View>
      {/* Sélecteur de pays amélioré */}
      <View ref={countryInputRef} collapsable={false}>
        <TouchableOpacity style={styles.inputWrapper} onPress={showDropdown}>
          <Text style={styles.inputIcon}>📍</Text>
          <Text style={[styles.input, { color: "#222", flex: 1 }]}>
            {country.flag} {country.name}
          </Text>
          <Text style={styles.inputIcon}>{showCountryList ? "▲" : "▼"}</Text>
        </TouchableOpacity>
      </View>
      {showCountryList && (
        <>
          {/* Overlay pour fermer le dropdown si on clique ailleurs */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowCountryList(false)}
          />
          <View
            style={[
              styles.dropdown,
              { top: dropdownTop, left: 20, right: 20, zIndex: 100 }
            ]}>
            <TextInput
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#eee",
                fontSize: 15
              }}
              placeholder="Rechercher un pays..."
              value={countrySearch}
              onChangeText={setCountrySearch}
              autoFocus
            />
            <ScrollView style={{ maxHeight: 200 }}>
              {COUNTRIES.filter((c) =>
                c.name.toLowerCase().includes(countrySearch.toLowerCase())
              ).map((c) => (
                <TouchableOpacity
                  key={c.code}
                  onPress={() => {
                    setCountry(c);
                    setShowCountryList(false);
                    setCountrySearch("");
                  }}>
                  <Text style={styles.countryItem}>
                    {c.flag} {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      )}
      {/* Type de compte */}
      <View style={styles.typeContainer}>
        <Text style={styles.typeLabel}>Type de compte</Text>
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={styles.radioBtn}
            onPress={() => setType("personnel")}>
            <View
              style={[
                styles.radioCircle,
                type === "personnel" && styles.radioSelected
              ]}
            />
            <Text style={styles.radioLabel}>Personnel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioBtn}
            onPress={() => setType("professionnel")}>
            <View
              style={[
                styles.radioCircle,
                type === "professionnel" && styles.radioSelected
              ]}
            />
            <Text style={styles.radioLabel}>Professionnel</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Mot de passe */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="Créez un mot de passe"
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
      <View style={styles.inputWrapper}>
        <Text style={styles.inputIcon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmez le mot de passe"
          placeholderTextColor="#A0A0A0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirm}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowConfirm((v) => !v)}>
          <Text style={styles.inputIcon}>{showConfirm ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>
      </View>
      {/* Cases à cocher */}
      <View style={styles.checkboxRow}>
        <TouchableOpacity
          onPress={() => setAcceptCGU((v) => !v)}
          style={styles.checkboxBox}>
          <View
            style={[styles.checkbox, acceptCGU && styles.checkboxChecked]}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          J’accepte les{" "}
          <Text style={styles.link}>conditions d’utilisation</Text>
        </Text>
      </View>
      <View style={styles.checkboxRow}>
        <TouchableOpacity
          onPress={() => setAcceptPrivacy((v) => !v)}
          style={styles.checkboxBox}>
          <View
            style={[styles.checkbox, acceptPrivacy && styles.checkboxChecked]}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          J’accepte la{" "}
          <Text style={styles.link}>politique de confidentialité</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.registerBtn, isLoading && styles.registerBtnDisabled]}
        onPress={handleRegister}
        disabled={isLoading}>
        <Text style={styles.registerBtnText}>
          {isLoading ? "Inscription en cours..." : "S’inscrire"}
        </Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Vous avez déjà un compte ? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.signupLink}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 12,
    width: "100%"
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: "#222",
    paddingVertical: 12
  },
  countryList: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 12,
    maxHeight: 180
  },
  countryItem: {
    padding: 12,
    fontSize: 15,
    color: "#222"
  },
  typeContainer: {
    width: "100%",
    marginBottom: 8
  },
  typeLabel: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
    color: "#222"
  },
  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#0a7e3a",
    marginRight: 6,
    backgroundColor: "#fff"
  },
  radioSelected: {
    backgroundColor: "#0a7e3a"
  },
  radioLabel: {
    fontSize: 15,
    color: "#222"
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "100%"
  },
  checkboxBox: {
    marginRight: 8
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#0a7e3a",
    borderRadius: 4,
    backgroundColor: "#fff"
  },
  checkboxChecked: {
    backgroundColor: "#0a7e3a"
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#222"
  },
  link: {
    color: "#0a7e3a",
    textDecorationLine: "underline"
  },
  registerBtn: {
    backgroundColor: "#0a7e3a",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 18
  },
  registerBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17
  },
  registerBtnDisabled: {
    opacity: 0.6
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
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    padding: 0,
    maxHeight: 250
  }
});

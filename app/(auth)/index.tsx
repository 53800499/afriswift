/** @format */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// SVG simple de l'Afrique avec flèche (inline)
import { useRouter } from 'expo-router';
import Svg, { Path } from "react-native-svg";

const AfricaSVG = () => (
  <View style={styles.logoContainer}>
    <Svg width={80} height={80} viewBox="0 0 80 80">
      <Path d="M20 10 L60 10 L70 30 L50 70 L30 60 L10 40 Z" fill="#0a7e3a" />
      <Path
        d="M35 35 L55 25 M55 25 L50 40 M55 25 L40 20"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  </View>
);

const features = [
  {
    icon: "🌍",
    title: "Plus de 20 pays connectés",
    subtitle: "Transferts transfrontaliers"
  },
  {
    icon: "⚡",
    title: "Frais inférieurs à 1%",
    subtitle: "Économisez sur chaque transfert"
  },
  {
    icon: "📱",
    title: "Accessible sans internet",
    subtitle: "Via USSD ou application mobile"
  }
];

export default function Screen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AfricaSVG />
      <Text style={[styles.title, { color: theme.text }]}>
        Transférez. Agrégez. Simplifiez
      </Text>
      <View style={styles.card}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <View>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureSubtitle}>{f.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/register')}>
        <Text style={styles.primaryBtnText}>Créer un compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.secondaryBtn, { borderColor: theme.text }]}
        onPress={() => router.push('/login')}>
        <Text style={[styles.secondaryBtnText, { color: theme.text }]}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerLink} onPress={() => {}}>
          À propos
        </Text>
        <Text style={styles.footerDot}>•</Text>
        <Text style={styles.footerLink} onPress={() => {}}>
          Fonctionnalités
        </Text>
        <Text style={styles.footerDot}>•</Text>
        <Text style={styles.footerLink} onPress={() => {}}>
          Contact
        </Text>
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
    marginBottom: 24
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 14
  },
  featureTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#0a7e3a"
  },
  featureSubtitle: {
    fontSize: 13,
    color: "#6b6b6b"
  },
  primaryBtn: {
    backgroundColor: "#0a7e3a",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    marginBottom: 14
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17
  },
  secondaryBtn: {
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    marginBottom: 30
  },
  secondaryBtnText: {
    fontWeight: "700",
    fontSize: 17
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  footerLink: {
    color: "#0a7e3a",
    fontWeight: "600",
    fontSize: 14,
    marginHorizontal: 6
  },
  footerDot: {
    color: "#bbb",
    fontSize: 18,
    marginHorizontal: 2,
    marginBottom: 2
  }
});

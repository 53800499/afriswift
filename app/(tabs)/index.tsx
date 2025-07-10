/** @format */

import Header from "@/components/Header";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const SOLDE = 15000;
const IDENTIFIANT = "AF38X92ZP71Q5RNVB0EJ";

const FONCTIONNALITES = [
  {
    icon: "send",
    label: "Envoyer",
    color: "#0a7e3a",
    route: "/envoyer"
  },
  { icon: "download", label: "Recevoir", color: "#f7a600" },
  { icon: "credit-card", label: "Paiements", color: "#7c3aed" },
  { icon: "history", label: "Historique", color: "#059669", route: "/history" }
];

const TRANSACTIONS = [
  {
    type: "recu",
    title: "Paiement reçu",
    desc: "Vous avez reçu 5 000 FCFA de Thomas Dubois sur Orange Money",
    date: "Il y a 2h",
    color: "#059669",
    icon: "check-circle"
  },
  {
    type: "compte",
    title: "Compte lié",
    desc: "Votre compte BNP Paribas a été lié avec succès",
    date: "Il y a 1j",
    color: "#2563eb",
    icon: "link"
  },
  {
    type: "paiement",
    title: "Paiement",
    desc: "Paiement de 2 300 FCFA à Marché Central",
    date: "Il y a 3j",
    color: "#a78bfa",
    icon: "credit-card"
  }
];

export default function HomeScreen() {
  const [tab, setTab] = useState("mobile");
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <Header title="AfriSwift" showIcons />
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === "mobile" && styles.tabActive]}
          onPress={() => setTab("mobile")}>
          <Text
            style={[styles.tabText, tab === "mobile" && styles.tabTextActive]}>
            Mobile Money
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "bank" && styles.tabActive]}
          onPress={() => setTab("bank")}>
          <Text
            style={[styles.tabText, tab === "bank" && styles.tabTextActive]}>
            Compte Bancaire
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {/* Carte solde */}
        <View style={styles.cardSolde}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10
            }}>
            <MaterialIcons
              name="account-balance-wallet"
              size={28}
              color="#f7a600"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Orange Money
            </Text>
            <View style={styles.badgeActif}>
              <Text style={styles.badgeActifText}>Actif</Text>
            </View>
          </View>
          <Text style={{ color: "#888", fontSize: 13, marginBottom: 2 }}>
            **** **** 5678
          </Text>
          <Text style={styles.soldeLabel}>Solde disponible</Text>
          <Text style={styles.soldeMontant}>{SOLDE.toLocaleString()} FCFA</Text>
          <TouchableOpacity style={styles.detailsBtn}>
            <Text style={styles.detailsBtnText}>Voir détails</Text>
            <Ionicons name="chevron-forward" size={16} color="#0a7e3a" />
          </TouchableOpacity>
        </View>
        {/* Fonctionnalités */}
        <View style={styles.fonctionnalitesContainer}>
          {FONCTIONNALITES.map((f, i) => (
            <TouchableOpacity
              key={i}
              style={styles.fonctionnalite}
              onPress={() => f.route && router.push(f.route)}>
              <View
                style={[
                  styles.fonctionIcon,
                  { backgroundColor: f.color + "22" }
                ]}>
                {" "}
                {/* Opacité */}
                <FontAwesome5 name={f.icon} size={22} color={f.color} />
              </View>
              <Text style={styles.fonctionLabel}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Identifiant unique */}
        <View style={styles.identifiantCard}>
          <Text style={styles.identifiantLabel}>Identifiant unique</Text>
          <Text selectable style={styles.identifiantValue}>
            {IDENTIFIANT}
          </Text>
          <Text style={styles.identifiantDesc}>
            Partagez cet identifiant pour recevoir des paiements directement sur
            vos comptes liés
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <TouchableOpacity style={styles.copyBtn} onPress={() => {}}>
              <Ionicons name="copy-outline" size={18} color="#0a7e3a" />
              <Text style={styles.copyBtnText}>Copier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn} onPress={() => {}}>
              <Ionicons name="share-social-outline" size={18} color="#0a7e3a" />
              <Text style={styles.copyBtnText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Dernières transactions */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Dernières transactions</Text>
          <Pressable>
            <Text style={styles.transactionsVoir}>Tout voir</Text>
          </Pressable>
        </View>
        <View>
          {TRANSACTIONS.map((t, i) => (
            <View key={i} style={styles.transactionCard}>
              <View
                style={[
                  styles.transactionIcon,
                  { backgroundColor: t.color + "22" }
                ]}>
                {" "}
                {/* Opacité */}
                <FontAwesome5 name={t.icon} size={18} color={t.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.transactionTitle}>{t.title}</Text>
                <Text style={styles.transactionDesc}>{t.desc}</Text>
                <Text style={styles.transactionDate}>{t.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Bouton flottant + */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#0a7e3a"
  },
  tabText: {
    color: "#888",
    fontWeight: "600",
    fontSize: 15
  },
  tabTextActive: {
    color: "#0a7e3a"
  },
  cardSolde: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2
  },
  badgeActif: {
    backgroundColor: "#e6f9ed",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 10
  },
  badgeActifText: {
    color: "#059669",
    fontWeight: "bold",
    fontSize: 13
  },
  soldeLabel: {
    color: "#888",
    fontSize: 13,
    marginTop: 10
  },
  soldeMontant: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10
  },
  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    alignSelf: "flex-end"
  },
  detailsBtnText: {
    color: "#0a7e3a",
    fontWeight: "bold",
    marginRight: 2
  },
  fonctionnalitesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 5
  },
  fonctionnalite: {
    alignItems: "center",
    flex: 1
  },
  fonctionIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6
  },
  fonctionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222"
  },
  identifiantCard: {
    backgroundColor: "#f5faff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 18
  },
  identifiantLabel: {
    color: "#0a7e3a",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4
  },
  identifiantValue: {
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1.2,
    color: "#222",
    marginBottom: 4
  },
  identifiantDesc: {
    color: "#666",
    fontSize: 13,
    marginTop: 2
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f9ed",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f9ed",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7
  },
  copyBtnText: {
    color: "#0a7e3a",
    fontWeight: "bold",
    marginLeft: 6
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  transactionsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222"
  },
  transactionsVoir: {
    color: "#059669",
    fontWeight: "bold",
    fontSize: 14
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1
  },
  transactionIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  transactionTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222"
  },
  transactionDesc: {
    color: "#666",
    fontSize: 13,
    marginTop: 2
  },
  transactionDate: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    backgroundColor: "#0a7e3a",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6
  }
});

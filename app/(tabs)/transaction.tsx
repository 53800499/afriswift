/** @format */

import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const DESTINATAIRE = {
  nom: "Thomas Dubois",
  pays: "Côte d'Ivoire",
  devise: "FCFA",
  wallet: "**** **** 5678",
  email: "thomas.dubois@email.com"
};

export default function EnvoyerScreen() {
  const [methode, setMethode] = useState("mobile");
  const [cle, setCle] = useState("AF38X92ZP71Q5RNVB0EJ");
  const [montant, setMontant] = useState("5000");
  const frais = 250;
  const total = Number(montant || 0) + frais;

  // Clavier numérique custom
  const handleKey = (val: string) => {
    if (val === "del") {
      setMontant(montant.slice(0, -1));
    } else if (val === "." && montant.includes(".")) {
      return;
    } else {
      setMontant((montant + val).replace(/^0+/, ""));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <Header
        title={"Envoyer de l'argent"}
        showBackButton
        rightContent={
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={22} color="#888" />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Méthode de paiement */}
        <View style={styles.card}>
          <Text style={styles.label}>Méthode de paiement</Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <TouchableOpacity
              style={[
                styles.methodBtn,
                methode === "mobile" && styles.methodBtnActive
              ]}
              onPress={() => setMethode("mobile")}>
              <Text
                style={[
                  styles.methodBtnText,
                  methode === "mobile" && styles.methodBtnTextActive
                ]}>
                Mobile Money
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodBtn,
                methode === "bank" && styles.methodBtnActive
              ]}
              onPress={() => setMethode("bank")}>
              <Text
                style={[
                  styles.methodBtnText,
                  methode === "bank" && styles.methodBtnTextActive
                ]}>
                Compte Bancaire
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Clé publique du destinataire */}
        <View style={styles.card}>
          <Text style={styles.label}>Clé publique du destinataire</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputCle}
              value={cle}
              onChangeText={setCle}
              placeholder="Clé publique..."
              autoCapitalize="characters"
              selectTextOnFocus
            />
            <TouchableOpacity style={styles.inputIcon}>
              <Ionicons name="qr-code-outline" size={22} color="#0a7e3a" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
            <TouchableOpacity style={styles.linkRow}>
              <Ionicons name="people-outline" size={16} color="#0a7e3a" />
              <Text style={styles.linkText}>Contacts récents</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkRow}>
              <Ionicons name="clipboard-outline" size={16} color="#0a7e3a" />
              <Text style={styles.linkText}>Coller</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Informations du destinataire */}
        <View style={styles.cardDestinataire}>
          <Text style={styles.labelDest}>Informations du destinataire</Text>
          <View style={styles.destHeader}>
            <View style={styles.avatarLarge}>
              <Ionicons name="person" size={28} color="#888" />
            </View>
            <View style={{ marginLeft: 14 }}>
              <Text style={styles.destNomLarge}>Thomas Dubois</Text>
              <Text style={styles.destPaysLarge}>Côte d{"'"}Ivoire • FCFA</Text>
            </View>
          </View>
          <View style={styles.destInfoBlock}>
            <View style={styles.destInfoRow}>
              <Text style={styles.destInfoLabel}>Orange Money</Text>
              <Text style={styles.destInfoValue}>**** **** 5678</Text>
            </View>
            <View style={styles.destInfoRow}>
              <Text style={styles.destInfoLabel}>Email</Text>
              <Text style={styles.destInfoValue}>thomas.dubois@email.com</Text>
            </View>
          </View>
        </View>
        {/* Montant à envoyer */}
        <View style={styles.cardMontant}>
          <Text style={styles.labelMontant}>Montant à envoyer</Text>
          <View style={styles.montantRow}>
            <Text style={styles.montantBig}>{montant || "0"}</Text>
            <Text style={styles.montantDevise}>FCFA</Text>
            <Text style={styles.montantEur}>
              ≈ {(Number(montant || 0) * 0.001524).toFixed(2)} EUR
            </Text>
          </View>
          {/* Clavier numérique */}
          <View style={styles.keypadBlock}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"].map(
              (k, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.keyBtn}
                  onPress={() => handleKey(k)}>
                  {k === "del" ? (
                    <Ionicons name="arrow-back" size={22} color="#0a7e3a" />
                  ) : (
                    <Text style={styles.keyBtnText}>{k}</Text>
                  )}
                </TouchableOpacity>
              )
            )}
          </View>
          <View style={styles.fraisBlock}>
            <View style={styles.fraisRow2}>
              <Text style={styles.fraisLabel2}>Frais de transaction</Text>
              <Text style={styles.fraisValue2}>{frais} FCFA</Text>
            </View>
            <View style={styles.fraisRow2}>
              <Text style={styles.fraisLabel2}>Total</Text>
              <Text style={styles.fraisTotal2}>
                {total.toLocaleString()} FCFA
              </Text>
            </View>
          </View>
        </View>
        {/* Message sécurité */}
        <Text style={styles.securite2}>
          Transaction sécurisée et cryptée. Temps estimé: 30 secondes
        </Text>
        {/* Bouton envoyer */}
        <TouchableOpacity style={styles.envoyerBtn2}>
          <Text style={styles.envoyerBtnText2}>Envoyer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1
  },
  label: {
    color: "#888",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2
  },
  methodBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  methodBtnActive: {
    borderColor: "#0a7e3a",
    backgroundColor: "#e6f9ed"
  },
  methodBtnInactive: {
    backgroundColor: "#f5f5f5"
  },
  methodBtnText: {
    fontWeight: "bold",
    color: "#888",
    fontSize: 15
  },
  methodBtnTextActive: {
    color: "#0a7e3a"
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    marginTop: 10,
    paddingHorizontal: 10
  },
  inputCle: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: "#222"
  },
  inputIcon: {
    marginLeft: 8
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  linkText: {
    color: "#0a7e3a",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 2
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center"
  },
  destNom: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222"
  },
  destPays: {
    color: "#888",
    fontSize: 13,
    marginTop: 2
  },
  destInfo: {
    color: "#444",
    fontSize: 13,
    marginTop: 2
  },
  montant: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#222"
  },
  devise: {
    fontWeight: "bold",
    color: "#888",
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 3
  },
  eur: {
    color: "#aaa",
    fontSize: 13,
    marginLeft: 8,
    marginBottom: 3
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 10
  },
  key: {
    width: "32%",
    aspectRatio: 1,
    margin: "1%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  keyText: {
    fontSize: 22,
    color: "#0a7e3a",
    fontWeight: "bold"
  },
  fraisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2
  },
  fraisLabel: {
    color: "#888",
    fontSize: 14
  },
  fraisValue: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 14
  },
  fraisTotal: {
    color: "#0a7e3a",
    fontWeight: "bold",
    fontSize: 16
  },
  securite: {
    color: "#059669",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 16,
    textAlign: "center"
  },
  envoyerBtn: {
    backgroundColor: "#0a7e3a",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8
  },
  envoyerBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  cardDestinataire: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1
  },
  labelDest: {
    color: "#888",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10
  },
  destHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  avatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center"
  },
  destNomLarge: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#222"
  },
  destPaysLarge: {
    color: "#888",
    fontSize: 14,
    marginTop: 2
  },
  destInfoBlock: {
    marginTop: 8,
    gap: 6
  },
  destInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  destInfoLabel: {
    color: "#888",
    fontSize: 14,
    fontWeight: "600"
  },
  destInfoValue: {
    color: "#222",
    fontSize: 14,
    fontWeight: "bold"
  },
  cardMontant: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1
  },
  labelMontant: {
    color: "#888",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10
  },
  montantRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10
  },
  montantBig: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#222"
  },
  montantDevise: {
    fontWeight: "bold",
    color: "#888",
    fontSize: 16,
    marginLeft: 6,
    marginBottom: 3
  },
  montantEur: {
    color: "#aaa",
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 3
  },
  keypadBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 10,
    justifyContent: "space-between"
  },
  keyBtn: {
    width: "30%",
    aspectRatio: 1,
    marginVertical: 6,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  keyBtnText: {
    fontSize: 22,
    color: "#0a7e3a",
    fontWeight: "bold"
  },
  fraisBlock: {
    marginTop: 8,
    marginBottom: 2
  },
  fraisRow2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2
  },
  fraisLabel2: {
    color: "#888",
    fontSize: 14
  },
  fraisValue2: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 14
  },
  fraisTotal2: {
    color: "#0a7e3a",
    fontWeight: "bold",
    fontSize: 16
  },
  securite2: {
    color: "#059669",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 16,
    textAlign: "center"
  },
  envoyerBtn2: {
    backgroundColor: "#0a7e3a",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 30
  },
  envoyerBtnText2: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
});

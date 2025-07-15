/** @format */

import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const FILTERS = [
  { label: "Toutes", type: null },
  { label: "Envois", type: "envoi" },
  { label: "Réceptions", type: "reception" },
  { label: "Mobile", canal: "Mobile Money" }
];

const GROUPS = [
  {
    label: "Aujourd'hui",
    filter: true,
    data: [
      {
        type: "reception",
        montant: 15000,
        devise: "FCFA",
        statut: "Complété",
        date: "2024-06-10T14:30:00",
        exp: "Marie Koné",
        pays: "Sénégal",
        canal: "Orange Money",
        icon: "arrow-down-circle",
        color: "#059669",
        montantPositif: true
      },
      {
        type: "envoi",
        montant: 5250,
        devise: "FCFA",
        statut: "Complété",
        date: "2024-06-10T10:15:00",
        dest: "Thomas Dubois",
        pays: "Côte d'Ivoire",
        canal: "Orange Money",
        icon: "arrow-up-circle",
        color: "#ef4444",
        montantPositif: false
      }
    ]
  },
  {
    label: "Hier",
    data: [
      {
        type: "reception",
        montant: 25000,
        devise: "FCFA",
        statut: "Complété",
        date: "2024-06-09T16:45:00",
        exp: "Jean Dupont",
        pays: "Cameroune",
        canal: "Compte Bancaire",
        icon: "arrow-down-circle",
        color: "#059669",
        montantPositif: true
      },
      {
        type: "envoi",
        montant: 10500,
        devise: "FCFA",
        statut: "Complété",
        date: "2024-06-09T09:20:00",
        dest: "Aminata Diallo",
        pays: "Mali",
        canal: "Compte Bancaire",
        icon: "arrow-up-circle",
        color: "#ef4444",
        montantPositif: false
      }
    ]
  },
  {
    label: "Cette semaine",
    data: [
      {
        type: "envoi",
        montant: 8750,
        devise: "FCFA",
        statut: "En attente",
        date: "2024-06-07T11:30:00",
        dest: "Moussa Traoré",
        pays: "Burkina Faso",
        canal: "Mobile Money",
        icon: "arrow-up-circle",
        color: "#fbbf24",
        montantPositif: false,
        pending: true
      },
      {
        type: "reception",
        montant: 12000,
        devise: "FCFA",
        statut: "Complété",
        date: "2024-06-07T08:15:00",
        exp: "Sophie Martin",
        pays: "Ghana",
        canal: "Orange Money",
        icon: "arrow-down-circle",
        color: "#059669",
        montantPositif: true
      }
    ]
  }
];

function filterTransactions(groups, filter, search, dateFilter) {
  // Filtrage par type/canal/date
  let filtered = groups
    .map((group) => ({
      ...group,
      data: group.data.filter((t) => {
        let match = true;
        if (filter.type) match = t.type === filter.type;
        if (filter.canal) match = match && t.canal === filter.canal;
        // Recherche
        if (search) {
          const s = search.toLowerCase();
          match =
            match &&
            ((t.exp && t.exp.toLowerCase().includes(s)) ||
              (t.dest && t.dest.toLowerCase().includes(s)) ||
              (t.pays && t.pays.toLowerCase().includes(s)) ||
              (t.canal && t.canal.toLowerCase().includes(s)) ||
              (t.montant && t.montant.toString().includes(s)));
        }
        // Filtre date
        if (dateFilter) {
          const d = new Date(t.date);
          match = match && d.toDateString() === dateFilter.toDateString();
        }
        return match;
      })
    }))
    .filter((group) => group.data.length > 0);
  return filtered;
}

export default function HistoriqueScreen() {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const filteredGroups = filterTransactions(
    GROUPS,
    FILTERS[selected],
    search,
    dateFilter
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <Header
        title="Historique des transactions"
        showBackButton
        rightContent={
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => setShowDateModal(true)}>
              <Ionicons name="funnel-outline" size={22} color="#0a7e3a" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSearch((s) => !s)}>
              <Ionicons name="search-outline" size={22} color="#0a7e3a" />
            </TouchableOpacity>
          </View>
        }
      />
      {/* Recherche */}
      {showSearch && (
        <View style={styles.searchBarRow}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#888"
            style={{ marginLeft: 10 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher (nom, montant, pays...)"
            value={search}
            onChangeText={setSearch}
            autoFocus
            placeholderTextColor="#bbb"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              {" "}
              <Ionicons
                name="close-circle"
                size={20}
                color="#aaa"
                style={{ marginRight: 10 }}
              />{" "}
            </TouchableOpacity>
          )}
        </View>
      )}
      {/* Filtres horizontaux */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersRow}
        contentContainerStyle={{
          paddingHorizontal: 12,
          gap: 10,
          alignItems: "center",
          height: 48
        }}>
        {FILTERS.map((f, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.filterBtn,
              selected === i ? styles.filterBtnActive : styles.filterBtnInactive
            ]}
            onPress={() => setSelected(i)}
            activeOpacity={0.85}>
            <Text
              style={[
                styles.filterText,
                selected === i
                  ? styles.filterTextActive
                  : styles.filterTextInactive
              ]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {filteredGroups.length === 0 && (
          <Text
            style={{
              color: "#aaa",
              textAlign: "center",
              marginTop: 40,
              fontSize: 16
            }}>
            Aucune transaction trouvée.
          </Text>
        )}
        {filteredGroups.map((group, idx) => (
          <View key={idx} style={{ marginBottom: 18 }}>
            <View style={styles.groupHeader}>
              <Text style={styles.groupLabel}>{group.label}</Text>
              {group.filter && (
                <TouchableOpacity
                  style={styles.filterDateBtn}
                  onPress={() => setShowDateModal(true)}>
                  <Ionicons name="calendar-outline" size={16} color="#0a7e3a" />
                  <Text style={styles.filterDateText}>Filtrer par date</Text>
                  {dateFilter && (
                    <Text
                      style={{
                        color: "#0a7e3a",
                        marginLeft: 8,
                        fontWeight: "bold"
                      }}>
                      {dateFilter.toLocaleDateString()}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
            {group.data.map((t, i) => (
              <View
                key={i}
                style={[styles.card, t.pending && styles.cardPending]}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: t.color + "22" }
                    ]}>
                    <Ionicons name={t.icon} size={22} color={t.color} />
                  </View>
                  <Text
                    style={[
                      styles.cardType,
                      {
                        color: t.montantPositif
                          ? "#059669"
                          : t.pending
                          ? "#fbbf24"
                          : "#ef4444"
                      }
                    ]}>
                    {t.type === "reception" ? "Réception" : "Envoi"}
                  </Text>
                  <Text
                    style={[
                      styles.cardMontant,
                      {
                        color: t.montantPositif
                          ? "#059669"
                          : t.pending
                          ? "#fbbf24"
                          : "#ef4444"
                      }
                    ]}>
                    {t.montantPositif ? "+" : "-"}
                    {t.montant.toLocaleString()} {t.devise}
                  </Text>
                </View>
                <View style={styles.cardStatusRow}>
                  <Text
                    style={[
                      styles.cardStatus,
                      { color: t.pending ? "#fbbf24" : "#059669" }
                    ]}>
                    {t.pending ? "En attente" : "✔️ Complété"}
                  </Text>
                  <Text style={styles.cardDate}>
                    {new Date(t.date).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.cardDetails}>
                  {t.type === "reception" ? (
                    <>
                      <Text style={styles.cardDetailLabel}>Expéditeur</Text>
                      <Text style={styles.cardDetailValue}>{t.exp}</Text>
                      <Text style={styles.cardDetailLabel}>Pays d'origine</Text>
                      <Text style={styles.cardDetailValue}>{t.pays}</Text>
                      <Text style={styles.cardDetailLabel}>Reçu sur</Text>
                      <View style={styles.cardDetailRow}>
                        <Ionicons
                          name="card-outline"
                          size={14}
                          color="#f7a600"
                          style={{ marginRight: 4 }}
                        />
                        <Text style={styles.cardDetailValue}>{t.canal}</Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={styles.cardDetailLabel}>Destinataire</Text>
                      <Text style={styles.cardDetailValue}>{t.dest}</Text>
                      <Text style={styles.cardDetailLabel}>Pays</Text>
                      <Text style={styles.cardDetailValue}>{t.pays}</Text>
                      <Text style={styles.cardDetailLabel}>Envoyé via</Text>
                      <View style={styles.cardDetailRow}>
                        <Ionicons
                          name="card-outline"
                          size={14}
                          color="#f7a600"
                          style={{ marginRight: 4 }}
                        />
                        <Text style={styles.cardDetailValue}>{t.canal}</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      {/* Modal filtre par date */}
      <Modal visible={showDateModal} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDateModal(false)}>
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
              Filtrer par date
            </Text>
            <TouchableOpacity
              style={styles.datePickerBtn}
              onPress={() => setShowPicker(true)}>
              <Ionicons name="calendar-outline" size={18} color="#0a7e3a" />
              <Text
                style={{ color: "#0a7e3a", fontWeight: "bold", marginLeft: 8 }}>
                {dateFilter
                  ? dateFilter.toLocaleDateString()
                  : "Choisir une date"}
              </Text>
            </TouchableOpacity>
            {dateFilter && (
              <TouchableOpacity
                style={styles.resetDateBtn}
                onPress={() => setDateFilter(null)}>
                <Ionicons name="close-circle" size={18} color="#ef4444" />
                <Text
                  style={{
                    color: "#ef4444",
                    fontWeight: "bold",
                    marginLeft: 6
                  }}>
                  Réinitialiser
                </Text>
              </TouchableOpacity>
            )}
            {showPicker && (
              <DateTimePicker
                value={dateFilter || tempDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) {
                    setDateFilter(selectedDate);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowDateModal(false)}>
              <Text style={{ color: "#0a7e3a", fontWeight: "bold" }}>
                Fermer
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 6,
    marginBottom: 2
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "transparent"
  },
  filtersRow: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    minHeight: 48
  },
  filterBtn: {
    minWidth: 90,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
    elevation: 0,
    borderWidth: 1.5
  },
  filterBtnActive: {
    backgroundColor: "#0a7e3a",
    borderColor: "#0a7e3a",
    shadowColor: "#0a7e3a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  filterBtnInactive: {
    backgroundColor: "#f3f3f3",
    borderColor: "#e0e0e0"
  },
  filterText: {
    fontWeight: "bold",
    fontSize: 15
  },
  filterTextActive: {
    color: "#fff"
  },
  filterTextInactive: {
    color: "#0a7e3a"
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  groupLabel: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222"
  },
  filterDateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f9ed",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  filterDateText: {
    color: "#0a7e3a",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 4
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1
  },
  cardPending: {
    borderColor: "#fbbf24",
    borderWidth: 1.5
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },
  cardType: {
    fontWeight: "bold",
    fontSize: 15,
    flex: 1
  },
  cardMontant: {
    fontWeight: "bold",
    fontSize: 16
  },
  cardStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8
  },
  cardStatus: {
    fontWeight: "bold",
    fontSize: 13
  },
  cardDate: {
    color: "#888",
    fontSize: 13,
    marginLeft: 8
  },
  cardDetails: {
    backgroundColor: "#f6fafd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#f0f4f8"
  },
  cardDetailLabel: {
    color: "#8a99a8",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2
  },
  cardDetailValue: {
    color: "#222",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6
  },
  cardDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 4
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 24,
    minWidth: 260,
    alignItems: "center"
  },
  modalCloseBtn: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#e6f9ed"
  },
  datePickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10
  },
  resetDateBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8
  }
});

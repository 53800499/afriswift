import Header from "@/components/Header";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function ProfilScreen() {
  const [twoFA, setTwoFA] = useState(true);
  const [notif, setNotif] = useState(true);
  const [hideSolde, setHideSolde] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f7fa" }}>
      <Header title="Paramètres" showBackButton />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Bloc profil */}
        <View style={styles.profileCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
              <TouchableOpacity style={styles.avatarCamBtn}>
                <Ionicons name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 14, flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.profileName}>Amadou Diallo</Text>
                <TouchableOpacity style={{ marginLeft: 6 }}>
                  <Feather name="edit-2" size={16} color="#0a7e3a" />
                </TouchableOpacity>
              </View>
              <Text style={styles.profileEmail}>amadou.diallo@gmail.com</Text>
              <View style={styles.verifiedBadge}><Text style={styles.verifiedText}>Compte vérifié</Text></View>
            </View>
          </View>
        </View>
        {/* Infos personnelles */}
        <Text style={styles.sectionTitle}>INFORMATIONS PERSONNELLES</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Adresse e-mail</Text>
            <Text style={styles.infoValue}>amadou.diallo@gmail.com</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <Feather name="smartphone" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Numéro de téléphone</Text>
            <Text style={styles.infoValue}>+221 77 123 45 67</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <Ionicons name="language" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Langue</Text>
            <Text style={styles.infoValue}>Français</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Pays de résidence</Text>
            <Text style={styles.infoValue}>Sénégal</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>
        {/* Sécurité */}
        <Text style={styles.sectionTitle}>SÉCURITÉ</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.infoRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Changer le mot de passe</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <Ionicons name="finger-print-outline" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Authentification à deux facteurs</Text>
            <View style={{ marginLeft: 'auto' }}>
              <Switch value={twoFA} onValueChange={setTwoFA} trackColor={{ true: '#0a7e3a', false: '#ccc' }} thumbColor={twoFA ? '#0a7e3a' : '#f4f3f4'} />
            </View>
          </View>
          <TouchableOpacity style={styles.infoRow}>
            <Feather name="smartphone" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Appareils connectés</Text>
            <View style={styles.deviceBadge}><Text style={styles.deviceBadgeText}>2</Text></View>
            <Ionicons name="chevron-forward" size={18} color="#bbb" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <Ionicons name="notifications-outline" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Notifications de connexion</Text>
            <View style={{ marginLeft: 'auto' }}>
              <Switch value={notif} onValueChange={setNotif} trackColor={{ true: '#0a7e3a', false: '#ccc' }} thumbColor={notif ? '#0a7e3a' : '#f4f3f4'} />
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="eye-off-outline" size={20} color="#8a99a8" style={{ marginRight: 12 }} />
            <Text style={styles.infoLabel}>Masquer le solde</Text>
            <View style={{ marginLeft: 'auto' }}>
              <Switch value={hideSolde} onValueChange={setHideSolde} trackColor={{ true: '#0a7e3a', false: '#ccc' }} thumbColor={hideSolde ? '#0a7e3a' : '#f4f3f4'} />
            </View>
          </View>
        </View>
        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  avatarWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginRight: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarCamBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0a7e3a',
    borderRadius: 16,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  profileEmail: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  verifiedBadge: {
    backgroundColor: '#e6f9ed',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  verifiedText: {
    color: '#059669',
    fontWeight: 'bold',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#8a99a8',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
    letterSpacing: 1.1,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f8',
  },
  infoLabel: {
    color: '#222',
    fontWeight: '600',
    fontSize: 15,
    flex: 1,
  },
  infoValue: {
    color: '#888',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '500',
  },
  deviceBadge: {
    backgroundColor: '#e6f9ed',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: 8,
  },
  deviceBadgeText: {
    color: '#059669',
    fontWeight: 'bold',
    fontSize: 13,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 18,
    backgroundColor: '#fff',
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

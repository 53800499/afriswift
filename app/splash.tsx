/** @format */

import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const router = useRouter();
  const backgroundImage = require("../assets/background.jpg");
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/(auth)' as any);
    }, 5000); // 5 secondes
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}>
      <View style={styles.overlay} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height
  },
  backgroundImage: {
    opacity: 0.9
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    alignSelf: "center"
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    lineHeight: 44
  },
  titleHighlight: {
    fontSize: 32,
    color: "#007AFF",
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 40,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    lineHeight: 26
  },
  subtitleHighlight: {
    color: "#007AFF",
    fontWeight: "600"
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5
  }
});

export default SplashScreen;

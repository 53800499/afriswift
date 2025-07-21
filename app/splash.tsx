/** @format */

import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
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
      resizeMode="contain"
      imageStyle={styles.backgroundImage}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "rgba(247, 247, 247, 1)"
  },
  backgroundImage: {
    width: "110%"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    alignSelf: "center"
  }
});

export default SplashScreen;

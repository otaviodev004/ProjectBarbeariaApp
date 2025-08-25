import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { splashStyles } from "@/src/Styles/splashStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  return (
    <View style={splashStyles.container}>
      <LottieView
        source={require('../assets/gifs/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => router.replace("/pages/Home")}
        style={splashStyles.animation}
      />
    </View>
  );
}

export const screenOptions = {
  headerShown: false,
};
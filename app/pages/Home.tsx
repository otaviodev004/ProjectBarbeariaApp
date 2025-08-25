import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, BackHandler, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import Login from "./Login";
import Onboarding from "../../src/Components/Onboarding";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if(value !== null){
        setViewedOnboarding(true);  
      }
    }catch(err) {
      console.log('Erro na checagem do Onboarding', err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      { loading ? <Loading /> : viewedOnboarding ? <Login /> : <Onboarding /> }
    </View>
  );
}

export const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};
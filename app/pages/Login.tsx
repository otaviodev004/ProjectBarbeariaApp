import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem("@viewedOnboarding");
        } catch (err) {
            console.log('Erro ao limpar o estado do Onboarding', err);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Tela Login</Text>
            <TouchableOpacity onPress={clearOnboarding}>
                <Text>Clear Onboarding</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: 24,
        fontWeight: "bold",
    }
});
import React from "react";
import { Image, StyleSheet, useWindowDimensions, View, Text } from "react-native";

type OnboardingItemProps = {
  item: {
    image: any;
    title: string;
    description: string;
  };
};

export default function OnboardingItem({ item }: OnboardingItemProps) {
    const { width } = useWindowDimensions();

    return(
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}></Image>

            <View style={{flex: 0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 10,
        color: '#493D8a',
        textAlign: 'center'
    },

    description: {
        fontWeight: "300",
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64
    }

});
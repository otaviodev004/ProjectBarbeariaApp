import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

type NextButtonOnboardingProps = {
    percentage: number;
    scrollTo: () => void;
};

export default function NextButtonOnboarding ({ percentage, scrollTo }: NextButtonOnboardingProps) {

    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null);

    const animation = (toValue: number) => {
        Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: false, // SVG não suporta useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        const listenerId = progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            if (progressRef.current) {
                progressRef.current.setNativeProps({ strokeDashoffset });
            }
        });

        return () => {
            progressAnimation.removeListener(listenerId);
        };
    }, [circumference, progressAnimation]);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={center}>
                    {/* Círculo de fundo */}
                    <Circle
                        stroke="#E6E7E8"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />

                    {/* Círculo animado */}
                    <Circle 
                        ref={progressRef}
                        stroke="#F4338F"
                        cx={center} 
                        cy={center} 
                        r={radius} 
                        strokeWidth={strokeWidth} 
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                    />
                </G>
            </Svg>

            <TouchableOpacity onPress={scrollTo} style={ styles.button } activeOpacity={0.6}>
                <AntDesign name="arrowright" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        position: "absolute",
        backgroundColor: "#F4338F",
        borderRadius: 100,
        padding: 20,
    }
});
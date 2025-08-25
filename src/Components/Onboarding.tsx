import React, { useState, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import slides from '../Data/sliders';
import OnboardingItem from "./OnborardingItem";
import Paginator from "./Paginator";
import NextButtonOnboarding from "./NextButtonOnboarding";



export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<any>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async() => {
        if(currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }else{
            try{
                await AsyncStorage.setItem("@viewedOnboarding", "true");
            }catch(err){
                console.log('Erro ao salvar o estado do Onboarding', err);
            }
        }
    };

    return(
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={ ({item}) => <OnboardingItem item={item} /> }
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false}
                    keyExtractor={item => item.id.toString()}
                    onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                x: scrollX
                            }
                        }
                    }], { useNativeDriver: false })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <Paginator data={slides} scrollX={scrollX} />
            <NextButtonOnboarding scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

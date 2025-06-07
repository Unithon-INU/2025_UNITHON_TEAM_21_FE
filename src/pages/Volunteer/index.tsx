import React, {useRef, useState} from 'react';
import {Animated, Text, View, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

import SearchBar from './components/SearchBar';
import RecommendButtons from './components/RecommendButtons';
import RecommendActivity from '../Home/components/RecommendVolunteer';
import ChatbotIcon from './components/ChatbotIcon';
import LikeVolunteer from '../Home/components/LikeVolunteer';

export default function Index() {
    const scrollY = useRef(new Animated.Value(0)).current;

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: false,
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            setIsScrolled(offsetY > 50);
        },
    });
    return (
        <>
            <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <View className="flex flex-col gap-3 px-5">
                    <View className="flex flex-col justify-between py-4">
                        <Text className="text-xl font-bold text-font-black">지역봉사</Text>
                    </View>
                    <SearchBar isScrolled={isScrolled} />
                    <RecommendButtons />
                    <RecommendActivity />
                    <LikeVolunteer />
                </View>
            </Animated.ScrollView>
            <ChatbotIcon />
        </>
    );
}

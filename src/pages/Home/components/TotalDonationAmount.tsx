import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Animated} from 'react-native';

export default function TotalDonationAmount() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 12345678,
            duration: 3000,
            useNativeDriver: false,
        }).start();

        const listener = animatedValue.addListener(({value}) => {
            setDisplayValue(Math.floor(value));
        });

        return () => {
            animatedValue.removeListener(listener);
        };
    }, [animatedValue]);

    const formattedValue = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
        <View className="mb-6">
            <Text className="mb-5 text-xl font-semibold text-left text-font-black">기봉사로 모은 총 기부금</Text>

            <View className="flex-row items-end justify-center py-4">
                <Text className="text-4xl font-semibold text-center text-main-color">{formattedValue}</Text>
                <Text className="mb-1 ml-1 text-base font-semibold text-main-color">원</Text>
            </View>

            <Text className="ml-32 text-xs font-normal text-center text-font-gray">{formattedDate} 기준</Text>
        </View>
    );
}

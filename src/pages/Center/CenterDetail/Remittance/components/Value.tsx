import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';

function AnimatedNumber({target}: {target: number}) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            toValue: target,
            duration: 300,
            useNativeDriver: false,
        }).start();

        const listener = animatedValue.addListener(({value}) => {
            setDisplayValue(Math.floor(value));
        });

        return () => {
            animatedValue.removeListener(listener);
        };
    }, [target, animatedValue]);

    return <Text>{displayValue.toLocaleString()}</Text>;
}

interface ValueProps {
    value: string | number;
    setValue: (value: string) => void;
    name: string;
}

export default function Value({value, setValue, name}: ValueProps) {
    const numericValue = typeof value === 'string' ? Number(value) : value;

    return (
        <View className="mt-4">
            <Text className="text-2xl font-semibold text-font-black">
                {name}
                <Text className="font-normal text-font-gray">으로</Text>
            </Text>
            <Text className={`py-4 text-3xl ${value ? 'text-font-black' : 'text-font-gray'}`}>
                {value || value === '0' ? (
                    <>
                        <AnimatedNumber target={numericValue} />원
                    </>
                ) : (
                    <>
                        <Text className="animate-pulse text-main-color">|</Text>얼마를 후원할까요?
                    </>
                )}
            </Text>
            <View className="flex flex-row gap-2">
                <TouchableOpacity className="px-2 py-1 rounded-lg bg-bg-gray" onPress={() => setValue('5000')}>
                    <Text className="text-base text-font-black">5,000원</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-2 py-1 rounded-lg bg-bg-gray" onPress={() => setValue('10000')}>
                    <Text className="text-base text-font-black">10,000원</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-2 py-1 rounded-lg bg-bg-gray" onPress={() => setValue('50000')}>
                    <Text className="text-base text-font-black">50,000원</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

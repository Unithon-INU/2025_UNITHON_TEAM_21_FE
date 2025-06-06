import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const KEYS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['00', '0', '←'],
];

export default function Remittance() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {name} = route.params as {name: string};
    const [value, setValue] = useState<string>('');

    const handleKeyPress = (key: string) => {
        if (key === '←') {
            setValue(value.slice(0, -1));
        } else {
            setValue(value + key);
        }
    };

    return (
        <View className="flex flex-col h-full gap-3 ">
            <View className="px-5 ">
                <View className="flex flex-row items-center py-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                </View>
                <View className="mt-4">
                    <Text className="text-2xl font-semibold text-font-black">
                        {name}
                        <Text className="font-normal text-font-gray">으로</Text>
                    </Text>
                    <Text className={`py-4 text-3xl ${value ? 'text-font-black' : 'text-font-gray'}`}>
                        {value || value === '0' ? (
                            `${Number(value).toLocaleString()}원`
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
            </View>
            <View className="absolute bottom-0 w-full ">
                <TouchableOpacity
                    className={`items-center py-5 ${value ? 'bg-main-color' : ''}`}
                    disabled={!value}
                    onPress={() => navigation.navigate('remittanceCheck', {name, value})}>
                    <Text className="text-lg font-semibold text-white">다음</Text>
                </TouchableOpacity>
                {KEYS.map((row, rowIndex) => (
                    <View key={rowIndex} className="flex flex-row justify-between mb-4">
                        {row.map(key => (
                            <TouchableOpacity key={key} className="items-center flex-1 p-5" onPress={() => handleKeyPress(key)}>
                                <Text className="text-3xl text-font-black">{key}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Value from './components/Value';

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
                <Value value={value} setValue={setValue} name={name} />
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

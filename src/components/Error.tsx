import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Error({text}: {text: string}) {
    const navigation = useNavigation() as any;
    return (
        <View className="flex flex-col items-center justify-center h-full gap-3">
            <MaterialIcons name="error" color={'#FFB257'} size={100} />
            <Text className="text-xl font-semibold text-font-black">{text}</Text>
            <TouchableOpacity className="px-4 py-3 rounded-lg bg-bg-gray" onPress={() => navigation.goBack()}>
                <Text className="font-semibold text-font-black">닫기</Text>
            </TouchableOpacity>
        </View>
    );
}

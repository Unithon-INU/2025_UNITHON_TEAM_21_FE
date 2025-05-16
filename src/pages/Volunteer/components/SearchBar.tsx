import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBar() {
    const [text, setText] = useState('');
    return (
        <View className="bg-[#EAEAEA] rounded-xl px-3 py-1 flex flex-row items-center">
            <Ionicons name="search-outline" size={20} color="#9A9A9A" />
            <TextInput className="w-full text-lg" value={text} onChangeText={setText} placeholder="Serach Volunteer" placeholderTextColor="#9A9A9A" />
        </View>
    );
}

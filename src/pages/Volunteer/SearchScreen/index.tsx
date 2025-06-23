import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Keyboard, ScrollView, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useVolunteerData} from '@/hook/api/useVolunteerData';
import {useDebounce} from '@/hook/useDebounce';
import {useDispatch} from 'react-redux';
import {addKeyword} from '@/store/slice/recentSearch';

import Recent from './components/Recent';
import Popular from './components/Popular';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchScreen() {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const navigation = useNavigation() as any;

    const debouncedText = useDebounce(text, 200);
    const {items} = useVolunteerData('', debouncedText);
    const {loading, items: popularVolunteer} = useVolunteerData('0400');

    const handleSearch = (searchWord?: string) => {
        const keyword = (searchWord ?? text).trim();
        if (keyword.length === 0) return;
        dispatch(addKeyword(keyword));
        navigation.replace('centerSearchResult', {keyword});
        setText('');
        Keyboard.dismiss();
    };

    if (loading) return null;

    return (
        <>
            <View className="flex flex-row items-center px-3 py-1 border-b-2 border-main-color">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <TextInput
                    className="flex-1 ml-2 text-base"
                    value={text}
                    onChangeText={setText}
                    placeholder="어떤 봉사를 찾으시나요?"
                    placeholderTextColor="#9A9A9A"
                    returnKeyType="search"
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoFocus
                    onSubmitEditing={() => handleSearch()}
                />
                <Ionicons name="search-outline" size={20} color="#9A9A9A" />
            </View>
            {debouncedText.length === 0 && (
                <View className="px-5">
                    <Recent onPress={handleSearch} />
                    <Popular items={popularVolunteer} onPress={handleSearch} />
                </View>
            )}
            {debouncedText.length > 0 && (
                <ScrollView keyboardShouldPersistTaps="handled">
                    {items.slice(0, 10).map(item => (
                        <TouchableOpacity key={item.progrmRegistNo} onPress={() => handleSearch(item.progrmSj)} className="p-4">
                            <Text className="text-base text-font-black" numberOfLines={1}>
                                {item.progrmSj}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </>
    );
}

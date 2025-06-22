import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {removeKeyword, clearKeywords} from '@/store/slice/recentSearch';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function Recent({onPress}: {onPress: (keyword: string) => void}) {
    const keywords = useSelector((state: any) => state.search.keywords);
    const dispatch = useDispatch();
    return (
        <>
            {keywords.length !== 0 && (
                <View className="py-4">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-lg font-semibold text-font-black">최근 검색어</Text>
                        <TouchableOpacity onPress={() => dispatch(clearKeywords())}>
                            <Text className="text-font-gray text-">전체삭제</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="mt-2" horizontal showsHorizontalScrollIndicator={false}>
                        {keywords.map((keyword: string, index: number) => (
                            <TouchableOpacity key={index} className="flex flex-row px-3 py-1 mr-2 rounded-full bg-bg-gray" onPress={() => onPress(keyword)}>
                                <Text className="mr-1 text-sm text-font-black">{keyword.length > 10 ? keyword.slice(0, 10) + '…' : keyword}</Text>
                                <TouchableOpacity key={index} onPress={() => dispatch(removeKeyword(keyword))}>
                                    <EvilIcons size={16} name="close" color="#484848" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </>
    );
}

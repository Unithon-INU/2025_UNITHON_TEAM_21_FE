import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {removeKeyword, clearKeywords} from '@/store/slice/recentSearch';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';

function RecentItem({keyword}: {keyword: string}) {
    const dispatch = useDispatch();
    const displayKeyword = keyword.length > 10 ? keyword.slice(0, 10) + '…' : keyword;
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity
            className="flex flex-row items-center px-3 py-1 mr-2 rounded-full bg-bg-gray"
            onPress={() => navigation.replace('volunteerCategory', {keyword})}>
            <Text className="mr-1 text-sm text-font-black">{displayKeyword}</Text>
            <EvilIcons size={12} name="close" color="#484848" onPress={() => dispatch(removeKeyword(keyword))} />
        </TouchableOpacity>
    );
}
export default function Recent() {
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
                            <RecentItem key={index} keyword={keyword} />
                        ))}
                    </ScrollView>
                </View>
            )}
        </>
    );
}

import React from 'react';
import {Text, FlatList, View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useCenterData} from '@/hook/api/useCenterData';
import Loading from '@/components/Loading';
import Header from './components/Header';
import CenterItem from '@/pages/Center/CenterList/components/CenterItem';

type CenterSearchParams = {
    keyword: string;
};

export default function CenterSearchResult() {
    const route = useRoute<RouteProp<Record<string, CenterSearchParams>, string>>();
    const {keyword = ''} = route.params || {};

    const {items, loading} = useCenterData(keyword);

    if (loading) return <Loading />;

    return (
        <View className="flex-1 bg-white">
            <Header text={keyword} />

            <Text className="px-5 mb-2 text-xl font-bold text-font-black">
                총 <Text className="text-main-color">{items.length}</Text>건의 지역센터
            </Text>

            <FlatList
                className="px-5"
                data={items}
                keyExtractor={(item, index) => `${item.centerName}-${index}`}
                renderItem={({item}) => <CenterItem item={item} />}
                ListEmptyComponent={<Text className="mt-10 text-center text-gray-500">검색 결과가 없습니다.</Text>}
                contentContainerStyle={{paddingBottom: 60}}
            />
        </View>
    );
}

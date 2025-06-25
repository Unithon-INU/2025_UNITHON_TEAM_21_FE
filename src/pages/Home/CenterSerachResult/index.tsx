import React from 'react';
import {Text, FlatList, View, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useCenterData} from '@/hook/api/useCenterData';
import Loading from '@/components/Loading';
import {useNavigation} from '@react-navigation/native';
import CenterItem from '@/pages/Center/CenterList/components/CenterItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CenterSearchResult() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {keyword = ''} = route.params as {keyword: string};

    const {items, loading} = useCenterData(keyword);

    if (loading) return <Loading />;

    return (
        <View className="flex-1 bg-white">
            <View className="flex flex-row items-center px-3 py-1 mb-4 border-b-2 border-main-color">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 py-2.5 ml-2" onPress={() => navigation.navigate('centerSearchScreen')}>
                    <Text className="text-base">{keyword}</Text>
                </TouchableOpacity>
                <Ionicons name="search-outline" size={20} color="#9A9A9A" />
            </View>

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

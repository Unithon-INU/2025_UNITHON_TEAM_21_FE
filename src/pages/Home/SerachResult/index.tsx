import React from 'react';
import {Text, FlatList, View, TouchableOpacity, Image} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {useCenterData} from '@/hook/api/useCenterData';
import Loading from '@/components/Loading';

type CenterSearchParams = {
    keyword: string;
};

export default function CenterSearchResult() {
    const route = useRoute<RouteProp<Record<string, CenterSearchParams>, string>>();
    const navigation = useNavigation();
    const {keyword = ''} = route.params || {};

    const {items, loading} = useCenterData(keyword);

    if (loading) return <Loading />;

    const handlePress = (center: any) => {
        navigation.navigate('centerDetail', {id: center.id});
    };

    return (
        <View className="flex-1 bg-white">
            {/* 🔙 뒤로가기 버튼 */}
            <View className="flex flex-row items-center px-3 py-2 border-b border-gray-200">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="ml-3 text-lg font-semibold text-font-black">검색 결과</Text>
            </View>

            {/* 🔎 검색 결과 리스트 */}
            <View className="flex-1 px-5 pt-4">
                <Text className="mb-2 text-xl font-bold text-font-black">
                    총 <Text className="text-main-color">{items.length}</Text>건의 지역센터
                </Text>

                <FlatList
                    data={items}
                    keyExtractor={(item, index) => `${item.centerName}-${index}`}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => handlePress(item)}
                            className="p-4 mb-2 bg-gray-100 rounded-lg"
                        >
                            <Text className="text-lg font-semibold text-font-black">{item.centerName}</Text>
                            <Text className="text-sm text-gray-700">{item.address}</Text>
                            <Text className="text-sm text-gray-700">{item.phoneNumber}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text className="mt-10 text-center text-gray-500">검색 결과가 없습니다.</Text>
                    }
                    contentContainerStyle={{paddingBottom: 60}}
                />
            </View>
        </View>
    );
}

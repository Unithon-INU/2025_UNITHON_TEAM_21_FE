import React from 'react';
import {FlatList, ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import {ChildrenCenterList} from '@/types/ChildrenCenter';

import {useNavigation} from '@react-navigation/native';
import {useCenter} from '@/hook/api/useCenter';

import Loading from '@/components/Loading';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import {KakaoMapAddress} from '@/components/KakaoMap';

function CenterItem({item}: {item: ChildrenCenterList}) {
    const navigate = useNavigation() as any;

    return (
        <View className="flex flex-row gap-2 mb-4">
            <KakaoMapAddress className="w-[120px] h-[120px]" location={item.address} name={item.centerName} />
            <TouchableOpacity className="flex flex-1 gap-1 " onPress={() => navigate.navigate('centerDetail', {id: item.id})}>
                <Text className="text-base font-bold text-font-black">
                    <Text className="text-main-color">{item.city} </Text>| {item.centerName}
                </Text>
                <Text className="text-sm font-semibold text-font-gray" numberOfLines={1}>
                    {item.address}
                </Text>
                <Text className="text-sm font-semibold text-font-gray">{item.phoneNumber}</Text>
                <Text className="text-sm font-semibold text-font-gray">아동수 : {item.chidrenNumber}명</Text>
                <Text className="text-sm font-semibold text-font-gray">봉사자 : {item.volunter}명</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function CenterList() {
    const {centerData, loading, fetchMore, isFetchingMore, hasMore} = useCenter();

    if (loading) return <Loading />;
    return (
        <>
            <HeaderBackButton px={true}>인근 지역아동센터</HeaderBackButton>
            <FlatList
                className="px-5"
                contentContainerStyle={{paddingBottom: 60}}
                data={centerData}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item}) => <CenterItem item={item} />}
                ListEmptyComponent={<Text className="text-base text-font-black">센터 정보가 없습니다.</Text>}
                onEndReached={() => {
                    if (hasMore && !isFetchingMore) fetchMore();
                }}
                onEndReachedThreshold={0.2}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" className="text-main-color" /> : null}
            />
        </>
    );
}

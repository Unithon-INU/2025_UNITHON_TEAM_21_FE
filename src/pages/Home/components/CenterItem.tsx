import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ColWrapper} from '@/components/layout/ContentWrapper';
import {ChildrenCenterList} from '@/types/ChildrenCenter';

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KakaoMapManyMarkerCenter} from '@/components/KakaoMap';

function Item({data}: {data: ChildrenCenterList}) {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity className="flex flex-row" onPress={() => navigation.navigate('centerDetail', {id: data.id})}>
            <View className="flex flex-col gap-1 px-2 py-3 rounded-2xl bg-main-color">
                <Text className="text-base font-semibold text-white">
                    {data.city} | {data.centerName}
                </Text>
                <Text className="text-xs font-semibold text-white">{data.address}</Text>
                <Text className="text-xs font-semibold text-white">{data.phoneNumber}</Text>
                <Text className="text-xs font-semibold text-white">아동 수 : {data.chidrenNumber}</Text>
                {data?.distance !== Infinity && data?.distance && (
                    <Text className="text-xs font-semibold text-white">
                        거리 : {` ${data.distance >= 1000 ? `${(data.distance / 1000).toFixed(1)}km` : `${data.distance.toFixed(0)}m`}`}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

export default function CenterItem({items}: {items: ChildrenCenterList[] | null}) {
    const navigation = useNavigation() as any;
    if (!items) return null;

    return (
        <ColWrapper title="근처 지역아동센터" href="centerList">
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('centerSearchScreen')}>
                <View className="bg-[#EAEAEA] rounded-xl px-3 py-3 flex flex-row items-center">
                    <Ionicons name="search-outline" size={20} color="#9A9A9A" />
                    <Text className="text-base text-[#9A9A9A]" style={{color: '#9A9A9A'}}>
                        찾는 지역센터가 있으신가요?
                    </Text>
                </View>
            </TouchableOpacity>
            <KakaoMapManyMarkerCenter items={items} className="w-full h-[240px]" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row gap-3">
                    {items.slice(0, 10).map((item, index) => (
                        <Item key={index} data={item} />
                    ))}
                </View>
            </ScrollView>
        </ColWrapper>
    );
}

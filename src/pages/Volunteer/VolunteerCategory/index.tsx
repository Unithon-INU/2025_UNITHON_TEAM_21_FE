import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {xml2Json} from '@/utils/xml2json';

import {getVltrSearchWordList} from '@/types/volunteerTyps';

import VolunteerItem from './components/VolunteerItem';
import Layout from '@/pages/Layout';

type VolunterrCategoryParams = {
    category: string;
    iconKey: string;
};

export default function VolunterrCategory() {
    const [loading, setLoading] = useState(false);
    const [volunteerData, setVolunteerData] = useState<getVltrSearchWordList>({} as getVltrSearchWordList);

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, VolunterrCategoryParams>, string>>();
    const {category = '', iconKey = ''} = route.params || {};

    const items = Array.isArray(volunteerData?.body?.items?.item)
        ? volunteerData.body.items.item
        : volunteerData?.body?.items?.item
        ? [volunteerData.body.items.item]
        : [];

    useEffect(() => {
        const fetchvolunteerData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrSearchWordList?upperClCode=${iconKey}&schSido=6280000`,
                );
                if (!response.ok) {
                    throw new Error('API 호출 실패');
                }
                const xml = await response.text();
                const json = xml2Json(xml);
                setVolunteerData(json);
            } catch (e: any) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchvolunteerData();
    }, [iconKey]);

    return (
        <Layout>
            <View className="flex flex-row items-center py-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-font-black">{category}</Text>
            </View>
            <ScrollView className="flex flex-col flex-1 gap-3">
                {loading && (
                    <View className="flex justify-center h-60">
                        <ActivityIndicator />
                    </View>
                )}
                {items.length === 0 && !loading && (
                    <View className="flex justify-center h-60">
                        <Text className="text-xl text-center text-font-gray">
                            주변에 참여하실 <Text className="text-main-color">{category}</Text> 활동을 못 찾았어요.
                        </Text>
                        <Text className="text-xl text-center text-font-gray">다른 카테고리에는 있을거에요!</Text>
                    </View>
                )}
                {!loading && items.length > 0 && (
                    <View className="flex flex-col gap-3">
                        <Text className="text-xl font-bold text-font-black">
                            전체 <Text className="text-main-color">{volunteerData?.body?.totalCount}</Text>건
                        </Text>
                        {items.map(item => (
                            <VolunteerItem item={item} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </Layout>
    );
}

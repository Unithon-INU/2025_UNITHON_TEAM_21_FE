import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';

import {xml2Json} from '@/utils/xml2json';

import {getVltrSearchWordList} from '@/types/volunteerTyps';

import VolunteerItem from '../VolunteerCategory/components/VolunteerItem';
import Layout from '@/components/Layout';
import HeaderBackButton from '@/components/button/HeaderBackButton';

export default function VolunterrCategory() {
    const [loading, setLoading] = useState(false);
    const [volunteerData, setVolunteerData] = useState<getVltrSearchWordList>({} as getVltrSearchWordList);

    const items = Array.isArray(volunteerData?.body?.items?.item)
        ? volunteerData.body.items.item
        : volunteerData?.body?.items?.item
        ? [volunteerData.body.items.item]
        : [];

    useEffect(() => {
        const fetchvolunteerData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrSearchWordList?schSido=6280000`);
                if (!response.ok) {
                    throw new Error('API call failed');
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
    }, []);

    return (
        <Layout>
            <HeaderBackButton>추천 봉사활동</HeaderBackButton>
            <ScrollView className="flex flex-col flex-1 gap-3">
                {loading && (
                    <View className="flex justify-center h-60">
                        <ActivityIndicator />
                    </View>
                )}
                {!loading && items.length > 0 && (
                    <View className="flex flex-col gap-3">
                        <Text className="text-xl font-bold text-font-black">
                            총 <Text className="text-main-color">{volunteerData?.body?.totalCount}</Text>건
                        </Text>
                        {items.map((item, idx) => (
                            <VolunteerItem item={item} key={idx} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </Layout>
    );
}

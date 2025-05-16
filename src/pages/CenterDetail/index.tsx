import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';

import {ChildrenCenterList} from '@/types/ChildrenCenter';

import Layout from '@/pages/Layout';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import {KakaoMapAddress} from '@/components/KakaoMap';
import DonationStatus from './components/DonationStatus';

export default function CenterDetail() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {id} = route.params as {id: number};
    const [data, setData] = useState<ChildrenCenterList>();

    useEffect(() => {
        const loadCSV = async () => {
            try {
                const content = await RNFS.readFileAssets('ChildrenCenterList.csv', 'utf8');
                const results = Papa.parse(content, {header: true});
                setData(results.data[id] as ChildrenCenterList);
            } catch (err) {
                console.error('Failed to read CSV:', err);
            }
        };
        loadCSV();
    }, [id]);

    return (
        <>
            <Layout>
                <View className="flex flex-row items-center py-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-font-black">{data?.centerName}</Text>
                </View>
                {data && <KakaoMapAddress className="w-full h-[240px]" location={data.address} name={data.centerName} />}
                <ColWrapper title="Directions">
                    <Text className="text-base font-semibold text-font-black">{data?.address}</Text>
                </ColWrapper>
                <ColWrapper title="Donation Status">
                    <DonationStatus />
                </ColWrapper>
                <ColWrapper title="Center News">
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.05.20 Incheon Children’s Center Holds Spring Cherry Blossom Outing
                    </Text>
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.04.25 New English Class Opens with Volunteers at Children’s Center
                    </Text>
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.04.19 Special Children’s Day Gifts Delivered at Local Center
                    </Text>
                </ColWrapper>
            </Layout>
            <View className="flex flex-row justify-between px-10 py-6 border-t border-bg-gray">
                <TouchableOpacity
                    className="w-[150px] bg-main-color py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                    onPress={() => navigation.navigate('remittance', {name: data?.centerName})}>
                    <Image className="w-6 h-6" source={require('@/assets/getCash.png')} />
                    <Text className="text-base font-bold text-center text-white">Donate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[150px] bg-font-black py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                    onPress={() => navigation.goBack()}>
                    <Image className="w-6 h-6" source={require('@/assets/chatIcon.png')} />
                    <Text className="text-base font-bold text-center text-white">Chat</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

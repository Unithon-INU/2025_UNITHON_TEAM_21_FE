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
                console.error('CSV 읽기 실패:', err);
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
                <ColWrapper title="오시는 길">
                    <Text className="text-base font-semibold text-font-black">{data?.address}</Text>
                </ColWrapper>
                <ColWrapper title="기부 현황">
                    <DonationStatus />
                </ColWrapper>
                <ColWrapper title="센터소식">
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.05.20 김혜성, MLB 데뷔 첫 홈런포 터졌다...
                    </Text>
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.04.25 코스피·코스닥 지수 4거래일 만에 하락 마감
                    </Text>
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.04.19 트럼프의 사우디아라비아 거래에서 가장 큰 수..
                    </Text>
                </ColWrapper>
            </Layout>
            <View className="flex flex-row justify-between px-10 py-6 border-t border-bg-gray">
                <TouchableOpacity
                    className="w-[150px] bg-main-color py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                    onPress={() => navigation.navigate('remittance', {name: data?.centerName})}>
                    <Image className="w-6 h-6" source={require('@/assets/getCash.png')} />
                    <Text className="text-base font-bold text-center text-white">기부하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[150px] bg-font-black py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                    onPress={() => navigation.goBack()}>
                    <Image className="w-6 h-6" source={require('@/assets/chatIcon.png')} />
                    <Text className="text-base font-bold text-center text-white">채팅하기</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

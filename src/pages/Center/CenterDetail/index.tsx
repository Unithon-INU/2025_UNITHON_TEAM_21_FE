import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';

import {ChildrenCenterList} from '@/types/ChildrenCenter';

import {KakaoMapAddress} from '@/components/KakaoMap';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import {useSelector} from 'react-redux';

export default function CenterDetail() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {id} = route.params as {id: number};
    const [data, setData] = useState<ChildrenCenterList>();
    const {profile} = useSelector((state: any) => state.user);

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

    const handleDonate = () => {
        if (!profile) {
            Alert.alert('로그인 후 이용해주세요.', '기부를 위해 로그인이 필요합니다.');
        } else navigation.navigate('remittance', {name: data?.centerName});
    };

    return (
        <>
            <Layout>
                <HeaderBackButton>{data?.centerName}</HeaderBackButton>
                {data && <KakaoMapAddress className="w-full h-[240px]" location={data.address} name={data.centerName} />}
                <ColWrapper title="오시는 길">
                    <Text className="text-base font-semibold text-font-black">{data?.address}</Text>
                </ColWrapper>
                <ColWrapper title="기부 현황">
                    <DonationStatus />
                </ColWrapper>
                <ColWrapper title="센터소식">
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.05.20 센터소식
                    </Text>
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.04.25 센터소식
                    </Text>
                    <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
                        2025.04.19 센터소식
                    </Text>
                </ColWrapper>
            </Layout>
            <View className="flex flex-row justify-between px-8 py-6 border-t border-bg-gray">
                <TouchableOpacity className="w-[150px] bg-main-color py-3 rounded-xl flex flex-row items-center justify-center gap-2" onPress={handleDonate}>
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

import React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {xml2Json} from '@/utils/xml2json';
import {decode} from 'he';

import {getVltrPartcptnItemListItem} from '@/types/volunteerTyps';

import {ColWrapper} from '@/components/layout/ContentWrapper';
import Layout from '@/pages/Layout';
import Detail from './components/Detail';
import {KakaoMap} from '../../../components/KakaoMap';

type VolunteerDetailParamList = {
    VolunteerDetail: {
        progrmRegistNo: number;
    };
};
function AbleFont({able}: {able: 'Y' | 'N'}) {
    if (able === 'Y') {
        return <Text className="text-[#6C9B7D]"> 가능</Text>;
    } else {
        return <Text className="text-[#D3706D]"> 불가능</Text>;
    }
}

export default function VolunteerDetail() {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState<getVltrPartcptnItemListItem>({} as getVltrPartcptnItemListItem);

    const navigation = useNavigation();
    const route = useRoute<RouteProp<VolunteerDetailParamList, 'VolunteerDetail'>>();

    const {progrmRegistNo} = route.params;
    const url = `https://www.1365.go.kr/vols/1572247904127/partcptn/timeCptn.do?titleNm=%EC%83%81%EC%84%B8%EB%B3%B4%EA%B8%B0&type=show&progrmRegistNo=${item.progrmRegistNo}`;
    useEffect(() => {
        const fetchitem = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrPartcptnItem?progrmRegistNo=${progrmRegistNo}`,
                );
                if (!response.ok) {
                    throw new Error('API 호출 실패');
                }
                const xml = await response.text();
                const json = xml2Json(xml);
                setItem(json.body.items.item);
            } catch (e: any) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchitem();
    }, [progrmRegistNo]);

    return (
        <>
            <Layout>
                <View className="flex flex-row items-center py-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <View className="flex justify-center h-60">
                        <ActivityIndicator />
                    </View>
                ) : (
                    <>
                        <Detail item={item} />
                        <ColWrapper title="봉사활동 소개">
                            <Text>{item.progrmCn ? decode(item.progrmCn) : ''}</Text>
                        </ColWrapper>
                        <ColWrapper title="봉사장소">
                            <Text>{item.actPlace}</Text>
                            <KakaoMap className="w-full h-[240px]" location={item.areaLalo1} name={item.actPlace} />
                        </ColWrapper>
                        <ColWrapper title="참여가능 여부">
                            <Text>
                                성인
                                <AbleFont able={item.adultPosblAt} />
                            </Text>
                            <Text>
                                청소년
                                <AbleFont able={item.grpPosblAt} />
                            </Text>
                            <Text>
                                단체
                                <AbleFont able={item.familyPosblAt} />
                            </Text>
                        </ColWrapper>
                    </>
                )}
            </Layout>
            <View className="flex flex-row justify-between px-10 py-6 border-t border-bg-gray">
                <TouchableOpacity className="w-[150px] bg-main-color py-3 rounded-xl" onPress={() => Linking.openURL(url)}>
                    <Text className="text-base font-bold text-center text-white">1365에서 신청하기</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-[150px] bg-font-gray py-3 rounded-xl" onPress={() => navigation.goBack()}>
                    <Text className="text-base font-bold text-center text-white ">닫기</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

import React from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {decode} from 'he';

import {ColWrapper} from '@/components/layout/ContentWrapper';
import Layout from '@/components/Layout';
import Detail from './components/Detail';
import {KakaoMap} from '../../../components/KakaoMap';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Loading from '@/components/Loading';
import {useVolunteerDeatil} from '@/hook/api/useVolunteerData';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {toggleLike} from '@/store/slice/likedSlice';

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
    const navigation = useNavigation();
    const route = useRoute<RouteProp<VolunteerDetailParamList, 'VolunteerDetail'>>();

    const {progrmRegistNo} = route.params;
    const {item, loading} = useVolunteerDeatil(progrmRegistNo);
    const url = `https://www.1365.go.kr/vols/1572247904127/partcptn/timeCptn.do?titleNm=%EC%83%81%EC%84%B8%EB%B3%B4%EA%B8%B0&type=show&progrmRegistNo=${item.progrmRegistNo}`;
    const dispatch = useDispatch();
    const likedList = useSelector((state: any) => state.liked.likedList);
    const isLiked = likedList.some((v: any) => v.progrmRegistNo === item.progrmRegistNo);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Layout>
                        <View className="flex flex-row items-center justify-between ">
                            <HeaderBackButton className="flex-1" />
                            <TouchableOpacity
                                className={`flex flex-row items-center px-2 py-1 rounded-2xl ${isLiked ? 'bg-main-color' : 'border border-main-color'}`}
                                onPress={() => dispatch(toggleLike(item))}>
                                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? '#FFFFFF' : '#FFB257'} />
                                <Text className={`ml-1 font-semibold ${isLiked ? 'text-white' : 'text-main-color'}`}>좋아요</Text>
                            </TouchableOpacity>
                        </View>
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
                    </Layout>
                    <View className="flex flex-row justify-between px-8 py-6 border-t border-bg-gray">
                        <TouchableOpacity className="w-[150px] bg-main-color py-3 rounded-xl" onPress={() => Linking.openURL(url)}>
                            <Text className="text-base font-bold text-center text-white">1365에서 신청하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[150px] bg-font-gray py-3 rounded-xl" onPress={() => navigation.goBack()}>
                            <Text className="text-base font-bold text-center text-white ">닫기</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </>
    );
}

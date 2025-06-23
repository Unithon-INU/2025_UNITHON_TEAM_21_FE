import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {StackNavigationProp} from '@react-navigation/stack';
import {useUserTotalDonation} from '@/hook/api/useDonation';

import {today} from '@/utils/formatDate';

import Layout from '../../components/Layout';
import AnimatedNumber from '@/components/animation/AnimatedNumber';
import Loading from '@/components/Loading';

export default function UserInfo() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const {profile} = useSelector((state: any) => state.user);
    const {item: totalDonation, loading} = useUserTotalDonation();

    if (loading) return <Loading />;
    return (
        <Layout>
            <View className="flex flex-col justify-between py-4">
                <Text className="text-xl font-bold text-font-black">내정보</Text>
            </View>
            {profile ? (
                <>
                    <View className="px-4 mb-6">
                        <View className="flex-row items-center mb-3 space-x-10">
                            <View className="w-[60px] h-[60px] rounded-full bg-main-gray" />

                            <Text className="ml-4 text-base font-semibold text-font-black">{profile.nickname}</Text>
                        </View>

                        <View className="items-center">
                            <TouchableOpacity onPress={() => navigation.navigate('Edituser')} className="bg-[#F8F8F8] px-4 py-1.5 rounded w-full items-center">
                                <Text className="text-sm font-semibold text-gray-700">프로필 수정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="mb-6">
                        <Text className="mb-5 text-xl font-semibold text-left text-font-black">기봉사와 함께한 기부금</Text>
                        <View className="flex-row justify-center items-end mb-2.5">
                            <AnimatedNumber className="text-4xl font-semibold text-center text-main-color" value={totalDonation.totalDonation} />
                            <Text className="mb-1 ml-1 text-base font-semibold text-main-color">원</Text>
                        </View>
                        <Text className="ml-32 text-xs font-normal text-center text-font-gray">{today()} 기준</Text>
                    </View>
                </>
            ) : (
                <View className="px-4 mb-6">
                    <View className="flex-row items-center mb-3 space-x-10">
                        <View className="w-[60px] h-[60px] rounded-full bg-main-gray" />

                        <Text className="ml-4 text-base font-semibold text-font-black">로그인 후 이용해주세요</Text>
                    </View>
                </View>
            )}

            {/* 나의 정보 섹션 */}
            <View className="h-auto pt-[10px] pb-[10px] px-[5px]">
                <Text className="font-inter font-semibold text-[20px] leading-[24px] mb-2 text-font-black">나의 정보</Text>

                {/* 관심 지역아동센터 */}
                <TouchableOpacity onPress={() => navigation.navigate('Userlikedcenter')} className="flex-row justify-between items-center mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="mr-2 w-6 h-6" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">관심 지역아동센터</Text>
                    </View>
                    <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                </TouchableOpacity>

                {/* 관심 봉사활동 */}
                <TouchableOpacity onPress={() => navigation.navigate('Userlikedvol')} className="flex-row justify-between items-center mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedvol.png')} className="mr-2 w-6 h-6" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">관심 봉사활동</Text>
                    </View>
                    <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                </TouchableOpacity>

                {/* 기부내역 */}
                <TouchableOpacity onPress={() => navigation.navigate('Userdonate')} className="flex-row justify-between items-center mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="mr-2 w-6 h-6" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">기부내역</Text>
                    </View>
                    <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                </TouchableOpacity>
            </View>
        </Layout>
    );
}

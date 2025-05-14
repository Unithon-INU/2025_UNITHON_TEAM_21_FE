import React, {} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Layout from '../Layout';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function UserInfo() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    return (
        <Layout>
            {/* 상단 */}
            <View className=" h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
                <Text className="font-inter font-Inter font-bold text-[24px] leading-[24px]">내정보</Text>
            </View>

            {/* 내정보 navi 프로필수정*/}

            {/* 기부금 */}
            <View className=" h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
                <Text className="font-inter font-Inter font-bold text-[20px] leading-[24px]">기봉사와 함께한 기부금</Text>
            </View>
            <View className="h-auto pt-[10px] pb-[10px] px-[5px]">
                <Text className="font-inter font-bold text-[20px] leading-[24px] mb-2">나의 정보</Text>

                {/* 관심 지역아동센터 */}
                <View className="flex-row items-center justify-between mb-3 mt-5">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">관심 지역아동센터</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userlikedcenter')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>

                {/* 관심 봉사활동 */}
                <View className="flex-row items-center justify-between  mb-3 mt-5">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedvol.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter  text-[16px]">관심 봉사활동</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userlikedvol')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>

                {/* 기부내역 */}
                <View className="flex-row items-center justify-between mb-3 mt-5">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter  text-[16px]">기부내역</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userdonate')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    );
}

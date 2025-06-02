import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Layout from '../Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default function UserInfo() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    return (
        <Layout>
            {/* 상단 */}
            <View className=" h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
                <Text className="font-inter font-semibold text-[24px] leading-[24px]">내정보</Text>
            </View>

            {/* Profile Edit Navigation */}

            {/* Donation Amount */}
            <View className="mb-6">
                <Text className="mb-5 text-xl font-semibold text-left text-font-black">기봉사와 함께한 기부금</Text>

                <View className="flex-row justify-center items-end mb-2.5">
                    <Text className="text-4xl font-semibold text-center text-main-color">345,678</Text>
                    <Text className="mb-1 ml-1 text-base font-semibold text-main-color">원</Text>
                </View>
            </View>

            <View className="h-auto pt-[10px] pb-[10px] px-[5px]">
                <Text className="font-inter font-bold text-[20px] leading-[24px] mb-2">내 정보</Text>

                {/* Favorite Children's Centers */}
                <View className="flex-row items-center justify-between mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">관심 지역아동센터</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userlikedcenter')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>

                {/* Favorite Volunteer Activities */}
                <View className="flex-row items-center justify-between mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedvol.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">관심 봉사활동</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userlikedvol')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>

                {/* Donation History */}
                <View className="flex-row items-center justify-between mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">기부내역</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userdonate')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    );
}

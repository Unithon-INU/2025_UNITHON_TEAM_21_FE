import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Layout from '../Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default function UserDonate() {
    const navigation = useNavigation<StackNavigationProp<any>>();

     const donationList = [
        { id: 1, center: '검단지역아동센터', amount: '39,000원' },
        { id: 2, center: '이름이너무긴지역아동센터', amount: '39,000원' },
        { id: 3, center: '검단지역아동센터', amount: '39,000원' },
    ];

    return (
        <Layout>
            {/* Top Bar */}
            <View className="flex-row items-center pb-4 space-x-2 ">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="font-inter font-bold text-[20px]">기부내역</Text>
            </View>

            <ScrollView className="flex-1">
                <View className="items-center w-full px-3">

                    {/* 총 기부금액 */}
                    <View className="w-full py-3">
                        <Text className="text-[20px] font-bold text-font-black mb-2 text-left">
                        기봉사와 함께하신 기부금
                        </Text>

                        <View className="flex-row items-end justify-center py-5 bg-white">
                            <Text className="text-[36px] font-bold text-main-color">345,678</Text>
                            <Text className="ml-1 mb-[2px] text-[20px] font-semibold text-main-color">원</Text>
                        </View>
                    </View>


        {/* 기부금 영수증 */}
        <Text className="text-[20px] text-font-black font-bold py-3">기부금 영수증</Text>

        {/* 구분선 */}
        <View className="h-[1px] bg-main-gray w-full mb-4" />

        {donationList.map((item) => (
            <View key={item.id} className="flex-row items-center justify-between w-full py-3">
                <Text className="text-[18px] font-bold text-font-black truncate">{item.center}</Text>
                <Text className="text-[18px] font-bold text-font-black">{item.amount}</Text>
            </View>
        ))}
            </View>
            </ScrollView>

        </Layout>
    );
}

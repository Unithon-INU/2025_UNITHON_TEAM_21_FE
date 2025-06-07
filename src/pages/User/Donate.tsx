import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Layout from '../../components/Layout';
import AnimatedNumber from '@/components/animation/AnimatedNumber';
import HeaderBackButton from '@/components/button/HeaderBackButton';

export default function UserDonate() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const donationList = [
        {id: 1, center: '검단지역아동센터', amount: '39,000원'},
        {id: 2, center: '이름이너무긴지역아동센터', amount: '39,000원'},
        {id: 3, center: '검단지역아동센터', amount: '39,000원'},
    ];

    return (
        <Layout>
            <HeaderBackButton>기부내역</HeaderBackButton>
            <ScrollView className="flex-1">
                <View className="items-center w-full px-3">
                    {/* 총 기부금액 */}
                    <View className="w-full py-3">
                        <Text className="text-[20px] font-bold text-font-black mb-2 text-left">기봉사와 함께하신 기부금</Text>
                        <View className="flex-row items-end justify-center py-5 bg-white">
                            <AnimatedNumber className="text-4xl font-bold text-main-color" value={345678} />
                            <Text className="ml-1 mb-[2px] text-[20px] font-semibold text-main-color">원</Text>
                        </View>
                        <Text className="ml-32 text-xs font-normal text-center text-font-gray">{formattedDate} 기준</Text>
                    </View>

                    <Text className="text-[20px] text-font-black font-bold py-3">기부금 영수증</Text>

                    <View className="h-[1px] bg-main-gray w-full mb-4" />

                    {donationList.map(item => (
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

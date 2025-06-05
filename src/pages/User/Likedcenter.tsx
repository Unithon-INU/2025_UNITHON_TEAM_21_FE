import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Layout from '../../components/Layout';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default function UserLikedcenter() {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const centerList = Array(5).fill({
    name: '검단지역아동센터',
    address: '인천 서구 검단로 501번길 69',
    tags: '#꿈나무 #쉼터',
    phone: '083)722-1234-5679',
    });

    return (
        <Layout>
            {/* Top Bar */}
            <View className="flex-row items-center pb-4 space-x-2 ">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="font-inter font-bold text-[20px]"> 관심 지역아동센터</Text>
            </View>

                  {/* 센터 리스트 */}
      <ScrollView className="flex-1">
        {centerList.map((center, idx) => (
          <View
            key={idx}
            className="p-3 mx-2 mb-3 rounded-lg bg-main-color"
          >
            <Text className="text-white font-semibold text-[20px] mb-1">{center.name}</Text>
            <Text className="text-white font-semibold text-[12px]">{center.address}</Text>
            <Text className="text-white font-semibold text-[12px]">{center.tags}</Text>
            <Text className="text-white font-semibold text-[12px]">{center.phone}</Text>
          </View>
        ))}
      </ScrollView>
        </Layout>
    );
}

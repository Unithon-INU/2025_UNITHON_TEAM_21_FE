import React, {} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Layout from '../Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';



export default function UserLikedvol() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <Layout>
      {/* 상단 */}
      <View className="flex-row items-center pb-7 space-x-2 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="font-inter font-Inter font-bold text-[20px]">  관심 봉사활동</Text>
      </View>
    </Layout>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Layout from '../../components/Layout';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ChildrenCenterList } from '@/types/ChildrenCenter';
import { KakaoMapAddress } from '@/components/KakaoMap';

function CenterItem({ item }: { item: ChildrenCenterList }) {
  const navigation = useNavigation() as any;

  return (
    <View className="flex flex-row gap-2 mb-4">
      <KakaoMapAddress className="w-[120px] h-[120px]" location={item.address} name={item.centerName} />
      <TouchableOpacity
        className="flex flex-1 gap-1"
        onPress={() => navigation.navigate('centerDetail', { id: item.id })}
      >
        <Text className="text-base font-bold text-font-black">
          <Text className="text-main-color">{item.city} </Text>| {item.centerName}
        </Text>
        <Text className="text-sm font-semibold text-font-gray" numberOfLines={1}>
          {item.address}
        </Text>
        <Text className="text-sm font-semibold text-font-gray">{item.phoneNumber}</Text>
        <Text className="text-sm font-semibold text-font-gray">아동수 : {item.chidrenNumber}명</Text>
        <Text className="text-sm font-semibold text-font-gray">봉사자 : {item.volunter}명</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function UserLikedcenter() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const centerList = useSelector((state: RootState) => state.likedCenter?.likedList || []);

  return (
    <Layout>
      {/* Top Bar */}
      <View className="flex-row items-center pb-4 space-x-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="font-inter font-bold text-[20px]">관심 지역아동센터</Text>
      </View>

      {/* 리스트 */}
      <ScrollView className="flex-1 px-2">
        {centerList.length === 0 ? (
          <Text className="mt-10 text-center text-font-black">
            좋아요한 지역아동센터가 없습니다.
          </Text>
        ) : (
          centerList.map((item: ChildrenCenterList, idx: number) => (
            <CenterItem key={idx} item={item} />
          ))
        )}
      </ScrollView>
    </Layout>
  );
}


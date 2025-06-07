import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Layout from '../../components/Layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function UserInfo() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<any>();

  // 로컬 상태: 이름, 프로필 이미지
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState('이름이 적힐 곳이에요');

  // 프로필 수정 후 돌아왔을 때 route.params 값 반영
  useEffect(() => {
    if (route.params?.profileImage) {
      setProfileImage(route.params.profileImage);
    }
    if (route.params?.userName) {
      setUserName(route.params.userName);
    }
  }, [route.params]);

  return (
    <Layout>
      {/* 상단 */}
      <View className="h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
        <Text className="font-inter font-semibold text-[24px] leading-[24px]">내정보</Text>
      </View>

{/* Profile Edit Section */}
<View className="px-4 mb-6">
  <View className="flex-row items-center mb-3 space-x-10">
    {profileImage ? (
      <Image
        source={{ uri: profileImage }}
        className="w-[50px] h-[50px] rounded-full"
        resizeMode="cover"
      />
    ) : (
      <View className="w-[60px] h-[60px] rounded-full bg-main-gray" />
    )}

    <Text className="ml-4 text-base font-semibold text-font-black">{userName}</Text>
  </View>

  <View className="items-center"> 
  <TouchableOpacity
    onPress={() => navigation.navigate('Edituser')}
    className="bg-[#F8F8F8] px-4 py-1.5 rounded w-full items-center"
  >
    <Text className="text-sm font-semibold text-gray-700">프로필 수정</Text>
  </TouchableOpacity>
  </View>
</View>


      {/* Donation Amount */}
      <View className="mb-6">
        <Text className="mb-5 text-xl font-semibold text-left text-font-black">기봉사와 함께한 기부금</Text>
        <View className="flex-row justify-center items-end mb-2.5">
          <Text className="text-4xl font-semibold text-center text-main-color">345,678</Text>
          <Text className="mb-1 ml-1 text-base font-semibold text-main-color">원</Text>
        </View>
      </View>

      {/* 나의 정보 섹션 */}
      <View className="h-auto pt-[10px] pb-[10px] px-[5px]">
        <Text className="font-inter font-bold text-[20px] leading-[24px] mb-2">나의 정보</Text>

        {/* 관심 지역아동센터 */}
        <View className="flex-row items-center justify-between mt-5 mb-3">
          <View className="flex-row items-center">
            <Image source={require('@/assets/likedcenter.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
            <Text className="font-inter text-[16px]">관심 지역아동센터</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Userlikedcenter')}>
            <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
          </TouchableOpacity>
        </View>

        {/* 관심 봉사활동 */}
        <View className="flex-row items-center justify-between mt-5 mb-3">
          <View className="flex-row items-center">
            <Image source={require('@/assets/likedvol.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
            <Text className="font-inter text-[16px]">관심 봉사활동</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Userlikedvol')}>
            <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
          </TouchableOpacity>
        </View>

        {/* 기부내역 */}
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
